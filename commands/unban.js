const { Client, MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])){
        return message.channel.send("Você não tem permissão para executar este comando!");   
    }

    if(isNaN(args[0])){
        return message.channel.send("Você precisa fornecer um ID.");
    } 

    let bannedMember = await bot.fetchUser(args[0]);
    
    if(!bannedMember) return message.channel.send("Forneça um ID de usuário para desbanir alguém!")

        let reason = args.slice(1).join(" ")
    if(!reason) reason = "Nenhuma razão dada!";

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Você não tem permissão para executar este comando!")|
        message.delete()

    try {
        message.guild.unban(bannedMember, reason)
        message.channel.send(`${bannedMember.tag} seu banimento foi revogado!`)
    } catch(e) {
        console.log(e.message)
    }

    const embed = new MessageEmbed()
    .setColor("#00BFFF")
    .setAuthor(`${message.guild.name} BANIMENTO REVOGADO`, message.guild.iconURL)
    .addField("Usuário banido:", `${bannedMember.username}`)
    .addField("Revogado por:", message.author.username)
    .addField("Razão:", reason)

    message.channel.send(embed).catch(console.error);

}