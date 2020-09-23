const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'poll',
  category: 'interaccion',
  description: 'Crea encuestas',
  run: async (client, message, args) => {

    const Embed = new MessageEmbed()
      .setColor('0xff0000')
      .setTitle('Nueva encuesta')
      .setDescription('.poll para iniciar la encuesta');

    if (!args[0]) {
      message.author.send(Embed);
      return;
    }

    let msgArgs = args.slice(1).join(" ");

    message.channel.send("📋 " + "**" + msgArgs + "**").then(messageReaction => {
      messageReaction.react("👍");
      messageReaction.react("👎");
      message.delete(1500).catch(console.error);
    });

  }
}