module.exports = {
    name: 'clear',
    aliases: ['nuke'],
    category: 'moderación',
    description: 'Borra el chat, rango[1-100]',
    run: async(client, message, args) => {
        if (message.deletable) message.delete;
        
        if (message.channel.type === 'dm'){
            return message.reply('no puedes usar este comando en tus mensajes directos');
        }

        if (!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.reply('No tienes permiso para borrar mensajes...').then(m => m.delete(5000));
        }

        let deleteAmount;

        if (args[0] === 'all'){
            deleteAmount = 100;
        }
        else{
            if (isNaN(args[0]) || parseInt(args[0]) <= 0){
                return message.reply("no se pueden borrar 0 mensajes... duh");
            }
            
            if (parseInt(args[0] > 100)){
                deleteAmount = 100;
            }
            else {
                deleteAmount = parseInt(args[0]);
            }
        }


        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`He borrado \`${deleted.size}\` mensajes.`))
            .catch(err => message.reply(err));
    }
}