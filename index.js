const site = require('./site/canvas.js');
site.run();

const Discord = require('discord.js');

const client = new Discord.Client();

const Database = require("@replit/database");
client.db = new Database();

const Canvas = require('canvas');
const { registerFont } = require('canvas');
registerFont('site/fonts/black-tail.ttf', { family: 'black-tail' });

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

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 60;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};

client.on('guildMemberAdd', async member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'anuncios');

  if (!channel) return;

  const canvas = Canvas.createCanvas(1280, 720);
  const ctx = canvas.getContext('2d');

  const background = await Canvas.loadImage('./site/img/background.jpg');

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#74037b';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.font = '28px black-tail';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Bienvenido al servidor', 720, canvas.height / 3.5);

  ctx.font = applyText(canvas, `${member.displayName}!`);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${member.displayName}!`, 720, canvas.height / 2.5);


  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));

  ctx.drawImage(avatar, 50, 50, 620, 620);

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

  channel.send(`Welcome to the server, ${member}!`, attachment);
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.toLowerCase().slice(prefix.length).split(/ +/);
  console.log(args);
  const command = args.shift().toLowerCase();

  switch (command) {
    case "clear":
      client.commands.get('clear').run(client, message, args);
      break;
    case "kick":
      client.commands.get('kick').run(client, message, args);
      break;
    case "roll":
      client.commands.get('roll').run(client, message, args);
      break;
    case "iroll":
      client.commands.get('roll').run(client, message, args, true);
      break;
    case "poll":
      client.commands.get('poll').run(client, message, args);
      break;
    case "join":
      client.emit('guildMemberAdd', message.member);
      break;
  }

  if (command === 'ch') {
    client.commands.get('character').run(client, message, args);
  }
});

client.login(process.env.DISCORD_TOKEN);