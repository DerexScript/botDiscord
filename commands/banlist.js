const { Client, MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
	//remove comando do chat
    message.delete();
	if(message.member.hasPermission("BAN_MEMBERS")){
		message.mentions.guild.fetchBans().then(banned => {
			let list = banned.map(user => {
				return user.user.tag;
			});
			if(list.length > 0){
				list.forEach( function(element, index) {
					const embed = new MessageEmbed()
					.setTitle("Lista De Membros Banidos:")
					.addField("Membro:", `${element}`)
					.setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
					.setColor("0x007bff").setTimestamp()
					message.author.send(embed);
				});
			}else{
				message.author.send("Não há usuarios banidos!");
			}
		});
	}else{
		message.author.send("Você não tem permissões para usar esse comando!");
	}    
}

module.exports.help = {
    name: "banlist"
}
