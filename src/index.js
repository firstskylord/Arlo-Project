require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`🤖 Logged in as ${c.user.tag}`);
});

// Message Interactions | Replies/Reacts to a message (or) Performs an action based on the message content.

client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }

    if (message.content.toLowerCase().includes('arlo')) {
        message.react('👀')
    }

    if (message.content.toLowerCase().includes('arlo, pin it')) {
        const ModRoles = ['✦ Quill Master', 'Senior Editor', 'Copy Editor', 'Proofreader', 'Event Curator', 'Archivist'];
        const hasRole = message.member.roles.cache.some(r => ModRoles.includes(r.name));
        if (!hasRole) return;

        message.react('📌')
            .then(() => message.pin());
    }

    if (message.content.toLowerCase().includes('arlo, start knitting')) {
        const ModRoles = ['✦ Quill Master', 'Senior Editor', 'Copy Editor', 'Proofreader', 'Event Curator', 'Archivist'];
        const hasRole = message.member.roles.cache.some(r => ModRoles.includes(r.name));
        if (!hasRole) return;

        message.react('🧶')
             .then(() => message.startThread({
                name: `New Thread with ${message.author.username}`,
                autoArchiveDuration: 1440, // 24 hours
            }))
             .then(thread => {
                thread.send(`🧶 Thread started by ${message.author}.
I request <@&1479068137616834754>, <@&1479068546054230016>, <@&1479069863103172770>, <@&1479070225361272884>, <@&1479070290800545944>, <@&1479070354264821770> to join the thread to assist with the request.`);
             });
    }

    if (message.channelId === '1478809803097772231') {
        message.react('👋🏻');
    }

    if (message.channelId === '1478819435778150431') {
        message.react('👏🏻')
            .then(() => message.react('🎉'));
    }
});

// Slash Command Interactions | All the actions performed by the bot through slash commands.

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'laugh') {
        interaction.reply(`HAHAHAHAHAHAHA!`);
    }
})

client.login(process.env.ARLO_TOKEN);
