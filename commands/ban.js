const { Client, MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    //remove comando do chat
    message.delete();
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply("Você não tem **permissão** suficiente !")
    let member = message.mentions.members.first()
    if(!member){
      try {
        member = message.guild.members.cache.get(args[0]);
      } catch(e) {
        return message.reply("Esta ID, esta fora do padrão!");
      }
    }
    if(!member)
      return message.reply("Por favor mencione um usuário válido !");
    if(!member.bannable)
      return message.reply("Eu não posso banir esse usuário, ele pode ter um cargo maior que o meu.");
    let reason = args.slice(1).join(' ')
    if(!reason) reason = "Nenhuma razão fornecida"
    await member.ban(reason)
      .catch(error => message.reply(`Desculpe ${message.author} não consegui banir o membro devido o: ${error}`));
      message.channel.send(`${message.author}`)
      const embed = new MessageEmbed()
          .setTitle("Sistema De Ban")
          .addField("Membro Banido:", `${member.user.tag}`)
          .addField("Banido por:", `${message.author.tag}`)
          .addField("Motivo:", `${reason}`)
          .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
          .setColor("DARK_RED").setTimestamp()
          message.channel.send(embed)    
}

module.exports.help = {
  name: 'ban',
  description: 'Realiza ban por menção ou por id.',
  usage: '!ban',
  caregory: 'Membros'
}
