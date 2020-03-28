const { Client, MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    //remove comando do chat
    message.delete();
    let clientping = new Date() - message.createdAt;
    message.channel.send(`${message.author}`);
    const embed = new MessageEmbed()
        .setTitle(":ping_pong:Pong")
        .addField(":robot:BOT: ", Math.floor(clientping) + "ms")
        .addField(":desktop:API: ", Math.floor(client.ws.ping) + "ms")
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor("RED")
        message.channel.send(embed)
}

module.exports.help = {
    name: "ping"
}
