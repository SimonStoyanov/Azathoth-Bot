const Discord = require("discord.js");

module.exports = {
    name: 'roll',
    category: 'rpg',
    run: async(client, message, args, iroll = false) => {

        if (args[0] == null){
            return message.author.send('Asegurate de usar el formato **X**'+'d'+'**Y**. \nX: numero de dados\nY: numero de caras');
        } 

        const tokens = args[0].split('d');

        if (isNaN(parseInt(tokens[0])) || isNaN(parseInt(tokens[1]))){
            return message.author.send('Asegurate de usar el formato **X**'+'d'+'**Y**. \nX: numero de dados\nY: numero de caras');
        }

        let resultArr = ``;
        let result = 0;

        for (let i=0; i < parseInt(tokens[0]); i++) {
            let rolled = Math.ceil(Math.random()*tokens[1]);
            resultArr += `${rolled} `;
            result += rolled;
        }

        let extra = false;
        let og_result = result;

        if (args[1])
        {
            switch(args[1]){
                case '+':
                    if (args[2] && !isNaN(parseInt(args[2]))) {
                        result += parseInt(args[2]);
                        extra = true;
                    }
                    break;
                case '-':
                    if (args[2] && !isNaN(parseInt(args[2]))) {
                        result -= parseInt(args[2]);
                        extra = true;
                    }
                    break;
                case 'x':
                case '*':
                    if (args[2] && !isNaN(parseInt(args[2]))) {
                        result *= parseInt(args[2]);
                        extra = true;
                    }
                    break;
                case '/':
                    if (args[2] && !isNaN(parseInt(args[2]))) {
                        result = Math.ceil(result / parseInt(args[2]));
                        extra = true;
                    }
                    break;
            }

        }

        let embColor = '0xff0000';
        let embTitle = `${message.author.username} ha lanzado los dados`;
        let embAuthIcon = `${message.author.displayAvatarURL()}`;
        let embDescription = `**\`Ha lanzado ⬷${tokens[0]}d${tokens[1]}⤐\`**`;
        let embThrownDices = `${resultArr}`;
        let embModifier;
        let embDC;
        let embResult;
        let embiRoll;

        if (extra) {
            embResult = `**(${og_result}) -> ${result}**`;
            embModifier = `${args[1]}${args[2]}`
        } 
        else {           
            embResult = `**${result}**`;
            embModifier = 'Sin bonus';
        }

        if (iroll)
        {
            if (extra) {
                embiRoll = isLess(result, args[3]);
                embDC = `menor o igual a ${args[3]}`;
            } 
            else if (!isNaN(parseInt(args[1]))) {
                embiRoll = isLess(result, args[1]);
                embDC = `menor o igual a ${args[1]}`;
            }
            else {
                embDC = `Sin DC`;
            }
        }
        else {
            embDC = `Sin DC`;
        }

        let embed = new Discord.MessageEmbed()
                .setColor(embColor)
                .setTitle(embTitle)
                .setAuthor(`${message.author.username}`, `${embAuthIcon}`, 'https://discord.com/channels/@me/756251502464729128/756441337401704499')
                .setDescription(`${embDescription}`)
                .addFields(
                    { name: 'Resultados individuales', value: `${embThrownDices}`},
                    { name: '⮚ Modificador', value: `${embModifier}`, inline: true},
                    { name: '⮚ DC', value: `${embDC}`, inline: true},
                    { name: '⮚ Resultado:', value: `${embResult}`}
                )

        if (iroll) {
          embed.addField('\u200B', `${embiRoll}`);
        }

        message.channel.send(embed);
    }
}

function isLess(res, toCompare) {
    if (res <= toCompare) {
        return `⚝⚝🞍**ÉXITO**🞍⚝⚝`
    } else {
        return `⚝⚝🞍**FALLO**🞍⚝⚝`
    }
}