const { Client, MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  //remove comando do chat
  message.delete();
  if(!message.member.hasPermission('KICK_MEMBERS')){
    return message.reply("Você não tem **permissão** suficiente !");
  }

  //Supondo que mencionamos alguém na mensagem, isso retornará o usuário
  let user = message.mentions.users.first();
  let reason = "";
  if(args[1] != undefined){
    reason = args[1];
  }else{
    reason = "Nenhuma razão fornecida";
  }
  if(!user){
    try {
      user = await client.users.fetch(args[0]);
    } catch(e) {
      return message.reply("Esta ID, esta fora do padrão!");
    }
  }
  //Se tivermos um usuário mencionado
  if (user) {
    //Agora obtemos o membro do usuário
    const member = message.guild.member(user);
    //Se o membro estiver na guilda
    if (member) {
      /**
       * Chute o membro
       * Certifique-se de executar isso em um membro, não em um usuário!
       * Existem grandes diferenças entre um usuário e um membro
      */
      if(!member.kickable){
        return message.reply("Eu não posso kickar esse usuário, ele pode ter um cargo maior que o meu.");
      }
        
      member
      .kick(reason)
      .then(() => {
          // Informamos o autor da mensagem que fomos capazes de chutar a pessoa
          const embed = new MessageEmbed()
          .setTitle("Sistema De Kick")
          .addField("Membro Kickado:", `${member.user.tag}`)
          .addField("Kickado por:", `${message.author.tag}`)
          .addField("Motivo:", `${reason}`)
          .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
          .setColor("DARK_RED").setTimestamp()
          message.reply(embed);
        }).catch(err => {
          // Ocorreu um erro
          // Isso geralmente ocorre porque o bot não consegue chutar o membro,
          // devido à falta de permissões ou hierarquia de funções
          return message.reply('Não consegui chutar o membro');
          // Registrar o erro
          console.error(err);
        });
    } else {
      //O usuário mencionado não está nesta guilda
      return message.reply("Esse usuário não está nesta guilda!");
    }
    //Caso contrário, se nenhum usuário foi mencionado
  } else {
    return message.reply("Por favor mencione um usuário válido!");
  }
}

module.exports.help = {
  name: "kick"
}
