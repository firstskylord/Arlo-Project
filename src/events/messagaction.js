require('dotenv').config();
const {  } = require('discord.js');

module.exports = (client) => {
    client.on('messageCreate', async (message) => {
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

            if (!message.reference) return message.reply('Reply to a message for me to pin it.');

            const targetMessage = await message.channel.messages.fetch(message.reference.messageId);
            await targetMessage.pin();
                message.react('📌');
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
}