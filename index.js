const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const Discord = require('discord.js');

const client = new Discord.Client();

const Database = require("@replit/database");
client.db = new Database();

const prefix = '.';

client.once('ready', () => {
    console.log('online');
});

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.toLowerCase().slice(prefix.length).split(/ +/);
    console.log(args);
    const command = args.shift().toLowerCase();

    if (command === 'clear') {
        client.commands.get('clear').run(client, message, args);
    } 
    if (command === 'kick') {
        client.commands.get('kick').run(client, message, args);
    }
    if (command === 'roll') {
        client.commands.get('roll').run(client, message, args, );
    }
    if (command === 'iroll') {
        client.commands.get('roll').run(client, message, args, true);   
    }
   if (command === 'ch') {
        client.commands.get('character').run(client, message, args);   
    }
});

client.login(process.env.DISCORD_TOKEN);