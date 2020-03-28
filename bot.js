const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const config = require('./config.json');
console.clear();

client.on("message", async message => {
	//se a ultima mensagem for do BOT, então encerra o evento de message!
    if (message.author.bot) return;
    //ignore messages that aren't from a guild
    if (!message.guild) return;
    //se mencionar o nome do BOT, então ele informa seu prefixo
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {
    	const embed = new MessageEmbed()
    	.setTitle('Olá meu prefixo é:')
    	.setColor(0x007bff)
    	.setDescription(`**${config.prefix}**`);
    	message.channel.send(embed);
    	return;
    }
    //se não tiver prefixo, então encerra evento de message
    if (!message.content.startsWith(config.prefix)) return;
    //obtem todos argumentos do comando separados por espaço
    let args = message.content.split(" ").slice(1);
    //obtem o comando
    let command = message.content.split(" ")[0];

    //remove o prefixo do comando
    command = command.slice(config.prefix.length).toLowerCase();
    try {
        let commandFile = require(`./commands/${command}.js`);
        delete require.cache[require.resolve(`./commands/${command}.js`)];
        return commandFile.run(client, message, args);
    } catch (err) {
        console.error("Erro:" + err)
    }
});



client.on("ready", () => {
	let activeUsers = [];
	let userStatus = [];
	let textChannel = 0;
	let voiceChannel = 0;
	let categoryChannel = 0;

	let onlineCount = client.users.cache.filter(m => {
		return m.bot === false;
	});

	let getStatusOfActiveUsers = () => {
		client.guilds.cache.forEach( function(element, index) {
			element.presences.cache.forEach( function(el, i) {
				let u = client.users.cache.get(el.userID);
				if(u.bot === false && el.status !== "offline"){
					activeUsers.push(u.username);
					userStatus.push(Object.values(el.clientStatus));
				}
			});
		});
	}

	getStatusOfActiveUsers();

	client.channels.cache.forEach( function(element, index) {
		if(element.type == "text") textChannel++;
		if(element.type == "voice") voiceChannel++;
		if(element.type == "category") categoryChannel++;
	});

    //console.log(`Bot foi iniciado com, ${client.users.cache.size} usuários, ${client.guilds.cache.size} servidores, ${client.channels.cache.size} canais.`)
	console.log(`Bot foi iniciado com, ${activeUsers.length} usuários online, ${onlineCount.size-activeUsers.length} offlines, ${client.guilds.cache.size} servidores, ${textChannel} canais de texto, ${voiceChannel} canais de voz, ${categoryChannel} Categorias.`);
    client.user.setStatus("offline");
    setInterval(() => {
    	//console.log(activeUsers.length);
        client.user.setActivity(`${activeUsers.length} pessoas`, { type: 'WATCHING' });
        activeUsers = [];
    	userStatus = [];
    	getStatusOfActiveUsers();
    }, 7000);
})

client.on('guildMemberAdd', member => {
	// Envie a mensagem para um canal designado em um servidor:
	const channel = member.guild.channels.cache.find(ch => ch.name === 'members-log');
  	// Não faça nada se o canal não foi encontrado neste servidor
  	if (!channel) {
  		console.log("Não fazer nada se o canal não for encontrado neste servidor");
  		return;
  	}
  	// Envie a mensagem, mencionando o membro
  	channel.send(`Olá ${member}, seja bem vindo ao servidor :D`);

});
client.login(config.token)