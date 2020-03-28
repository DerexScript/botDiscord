const { Client, MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, prefix) => {

    let user = message.mentions.users.first();
    let reason = args[0];
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Voce está sem permissao")
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Estou sem permissao")
    if (!reason) return message,channel.send("É necessario colocar um numero de 2 à 100")
    if (isNaN(reason)) return message.channel.send("É necessario colocar um numero de 2 à 100")
    if (reason < 2) return message.channel.send("esse numero é muito baixo")
    if (reason > 100) return message.channel.send("esse numero é muito alto")
    let massagem ="";
    let viagem ="";
    //remove comando do chat
    message.delete();
    message.channel.messages.fetch({limit: reason}).then((messages) => {
        if (!user) {
            massagem = messages.filter(m => m.author.id).array().slice(0, reason);
            viagem = massagem.filter(a => a.pinned === false);
        }
        message.channel.bulkDelete(viagem).catch(console.error);

        const embed = new MessageEmbed()
          .setTitle("Limpeza")
          .addField("Chat limpo por: ", `${message.author.tag}`)
          .setColor("GREEN")
          message.channel.send(embed);
     });
}

module.exports.help = {
    name: "clear"
}
