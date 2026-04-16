require('dotenv').config();
const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === 'report') {
            const ReportEmbed = new EmbedBuilder()
                .setTitle('📄・A Side-Quest has been assigned!')
                .setDescription(`**${interaction.user} has reported ${interaction.options.getUser('user')}** for misconduct of rules.
Please check the reason below and take necessary action.`)
                .setFields(
                    { name: '👤・Reason', value: `${interaction.options.getString('reason')}` },
                    { name: '🔗・Message Link', value: `${interaction.options.getString('message-link') || 'N/A'}` },
                    { name: '💳・UserID', value: `${interaction.options.getUser('user').id}` }
                )
                .setThumbnail(interaction.options.getUser('user').displayAvatarURL())
                .setImage(interaction.options.getAttachment('evidence') ? interaction.options.getAttachment('evidence').url : null)
                .setColor('#1abc9c')
                .setFooter({ text: 'Keep up the great work!', iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp();

            const reportChannel = interaction.client.channels.cache.get(process.env.REPORT_CHANNEL_ID);
            await reportChannel.send({ embeds: [ReportEmbed] });

            await interaction.reply({ content: 'Your report has been submitted. Moderators will look into it shortly.', ephemeral: true });
        }
    })
}