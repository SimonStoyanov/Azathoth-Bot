module.exports = {
    name: 'kick',
    category: 'moderación',
    description: 'Echa a un usuario del canal',
    run: async(client, message, args) => {
        
        if (message.channel.type === 'dm') {
            return message.auhor.send('no puedes usar este comando en tus mensajes directos');
        }

        if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.author.send('No tienes permisos suficientes');
        }

        let mentionMember = message.mentions.members.first();

        let authorRole = message.member.roles.highest;
        let mentionRole = mentionMember.roles.highest;

        if (mentionRole >= authorRole) {
            return message.author.send('No puedes echar a gente con un rol igual o mayor al tuyo');
        }

        mentionMember.kick()
            .then(() => message.channel.send(`${member.displayName} ha sido echado`));

    }
}