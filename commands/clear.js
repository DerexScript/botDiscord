const { Client, MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');

exports.run = async (client, message, args, prefix) => {
    let user = message.mentions.users.first();
    let reason = args[0];
    if (!message.member.permissions.has([Permissions.FLAGS.MANAGE_MESSAGES])) return message.channel.send("Voce está sem permissao")
    if (!message.guild.me.permissions.has([Permissions.FLAGS.MANAGE_MESSAGES])) return message.channel.send("Estou sem permissao")
    if (!reason) return message, channel.send("É necessario colocar um numero de 2 à 100")
    if (isNaN(reason)) return message.channel.send("É necessario colocar um numero de 2 à 100")
    if (reason < 2) return message.channel.send("esse numero é muito baixo")
    if (reason > 100) return message.channel.send("esse numero é muito alto")
    //remove comando do chat
    message.delete();

    await message.channel.bulkDelete(reason);

    const embed = new MessageEmbed()
        .setTitle("Limpeza")
        .addField("Chat limpo por: ", `${message.author.tag}`)
        .addField("Deleted: ",`${reason} messages`)
        .setColor("GREEN")
    message.channel.send({ embeds: [embed] });
}

module.exports.help = {
    name: "clear"
}