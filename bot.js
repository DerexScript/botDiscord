const { Client, Intents, Message, MessageEmbed } = require('discord.js');
const { token, prefix } = require('./config.json');

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

client.once('ready', () => {
    console.log(`Ready! ${client.user.tag}`);
});

/* Reconhecer a mensagem para comando*/
client.on('messageCreate', async message => {
    if (message.author.bot) return;
    //se mencionar o nome do BOT, então ele informa seu prefixo
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {
        const embed = new MessageEmbed()
            .setTitle(`Olá ${message.author.username}, meu prefixo é:`)
            .setColor(0x007bff)
            .setDescription(`**${prefix}**`);
        message.channel.send({ embeds: [embed] });
        return;
    }
    if (!message.content.startsWith(prefix)) return;
    //obtem o comando
    let command = message.content.split(" ")[0];
    //obtem todos argumentos do comando separados por espaço
    let args = message.content.split(" ").slice(1);
    //remove o prefixo do comando
    command = command.slice(prefix.length).toLowerCase();
    try {
        let commandFile = require(`./commands/${command}.js`);
        delete require.cache[require.resolve(`./commands/${command}.js`)];
        return commandFile.run(client, message, args);
    } catch (err) {
        console.error("Erro:" + err)
    }
})

client.login(token);