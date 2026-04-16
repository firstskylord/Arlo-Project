require('dotenv').config();
const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    // Warning users logic
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === 'warn') {
            const WarnEmbed = new EmbedBuilder()
                .setTitle('⚠️・A Warning has been issued!')
                .setDescription(`**${interaction.user} has warned ${interaction.options.getUser('user')}** for misconduct of rules.`)
                .setColor('#285A48')
                .setFields(
                    {
                        name: '👤・Warner Details',
                        value: `Usertag: ${interaction.user.tag}
User ID: ${interaction.user.id}`,
                        inline: true
                    },
                    {
                        name: '👤・Warned Person Details',
                        value: `Usertag: ${interaction.options.getUser('user').tag}
User ID: ${interaction.options.getUser('user').id}`,
                        inline: true
                    },
                    {
                        name: '💳・Reason',
                        value: `${interaction.options.getString('reason')}`,
                        inline: false
                    },
                    {
                        name: '🔗・Message Link',
                        value: `${interaction.options.getString('message-link') || 'N/A'}`,
                        inline: false
                    }
                )
                .setThumbnail(interaction.options.getUser('user').displayAvatarURL())
                .setFooter({ text: 'Arlo is always watching', iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp();

            const warnChannel = interaction.client.channels.cache.get(process.env.WARN_CHANNEL_ID);
            await warnChannel.send({ embeds: [WarnEmbed] });

            await interaction.reply({ content: `<@${interaction.options.getUser('user').id}> has been warned. Rest free, ${interaction.user.tag}!`, ephemeral: true });
        }
    });
}