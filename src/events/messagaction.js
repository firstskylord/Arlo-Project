require('dotenv').config();
const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    client.on('messageCreate', async (message) => {

        // Actions performed by the bot through message commands | Used on regular basis

        if (message.author.bot) {
            return;
        }

        if (message.content.toLowerCase().includes('arlo')) { // Reacts to messages that contain "Arlo"
            message.react('👀')
        }

        if (message.content.toLowerCase().includes('arlo, pin this')) { // Pins the message that contains the command
            const ModRoles = ['✦ Quill Master', 'Senior Editor', 'Copy Editor', 'Proofreader', 'Event Curator'];
            const hasRole = message.member.roles.cache.some(r => ModRoles.includes(r.name));
            if (!hasRole) return;

            message.react('📌')
                .then(() => message.pin());
        }

        if (message.content.toLowerCase().includes('arlo, pin it')) { // Pins the message that the command message is replying to
            const ModRoles = ['✦ Quill Master', 'Senior Editor', 'Copy Editor', 'Proofreader', 'Event Curator'];
            const hasRole = message.member.roles.cache.some(r => ModRoles.includes(r.name));
            if (!hasRole) return;

            if (!message.reference) return message.reply('Reply to a message for me to pin it.');

            const targetMessage = await message.channel.messages.fetch(message.reference.messageId);
            await targetMessage.pin();
                message.react('📌');
        }

        if (message.content.toLowerCase().includes('arlo, start knitting')) { // Starts a thread with the message that contains the command
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

        if (message.channelId === process.env.INTRODUCTION_CHANNEL_ID) { // Reacts to messages in #🖋️・introduction channel
            message.react('👋🏻');
        }

        if (message.channelId === process.env.MILESTONES_CHANNEL_ID) { // Reacts to messages in #🎉・milestones channel
            message.react('👏🏻')
                .then(() => message.react('🎉'));
        }

        // Embeds sent through request in specific channels | Used rarely
        
        if(message.content.toLowerCase().includes('arlo, update guide')) { // Embed for the 📖・guide channel
            const ModRoles = ['✦ Quill Master', 'Senior Editor'];
            const hasRole = message.member.roles.cache.some(r => ModRoles.includes(r.name));
            if (!hasRole) return;

            const GuideWelcEmbed = new EmbedBuilder()
                .setTitle('Welcome to Nova Archives!')
                .setDescription(``)
                .setFields(
                    {
                        name: '',
                        value: ``
                    },
                    {
                        name: '',
                        value: ``
                    },
                    {
                        name: '',
                        value: ``
                    }
                )
                .setThumbnail()
                .setImage()
                .setColor('#1abc9c')
                .setFooter({
                    text: 'Embed',
                    iconURL: ``
                });

                const GuideChannel = interaction.client.channels.cache.get(process.env.GUIDE_CHANNEL_ID);
                    GuideChannel.send({ embeds: [GuideWelcEmbed] });
        }


    });
}