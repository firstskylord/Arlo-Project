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
                    {
                        name: '👤・Reason',
                        value: `${interaction.options.getString('reason')}`
                    },
                    {
                        name: '🔗・Message Link',
                        value: `${interaction.options.getString('message-link') || 'N/A'}`
                    },
                    {
                        name: '💳・UserID',
                        value: `${interaction.options.getUser('user').id}`,
                        inline: true
                    },
                    {
                        name: '🆔・ReporterID',
                        value: `${interaction.user.id}`,
                        inline: true
                    }
                )
                .setThumbnail(interaction.options.getUser('user').displayAvatarURL())
                .setImage(interaction.options.getAttachment('evidence') ? interaction.options.getAttachment('evidence').url : null)
                .setColor('#1abc9c')
                .setFooter({ text: 'Keep up the great work!', iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp();

            const reportChannel = interaction.client.channels.cache.get(process.env.REPORT_CHANNEL_ID);
            const reportMessage = await reportChannel.send({ embeds: [ReportEmbed] });

            const reportThread = await reportMessage.startThread({
                name: `📋 Report ・ ${interaction.options.getUser('user').username}`,
                autoArchiveDuration: 1440,
            });

            await reportThread.send(
                `<@&1479068546054230016> <@&1479069863103172770> <@&1479070225361272884>
**New side quest has dropped.**
Review the embed above, interrogate the situation, discuss among yourselves here, and close the thread once action is taken.`
            );

            await interaction.reply({ content: 'Your report has been submitted. Moderators will look into it as soon as possible.', ephemeral: true });
        }
    })
}