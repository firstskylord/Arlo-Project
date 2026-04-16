require('dotenv').config();
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = (client) => {
    client.on('interactionCreate', async (interaction) => {
        if (interaction.isButton()) { // Admin Availability Button Logic
            if (interaction.customId === 'toggle_availability') {

            await interaction.deferReply({ ephemeral: true });

            console.log('Button triggered by:', interaction.member.displayName);

            const modRoles = ['✦ Quill Master', 'Senior Editor', 'Copy Editor', 'Proofreader', 'Event Curator', 'Archivist'];
            const unavailableRoleName = 'Shelved Editor';

            const unavailableRole = interaction.guild.roles.cache.find(r => r.name === unavailableRoleName);
            if (!unavailableRole) return interaction.editReply({ content: 'Role not found.'});

            const hasUnavailable = interaction.member.roles.cache.has(unavailableRole.id);

            if (hasUnavailable) {
                await interaction.member.roles.remove(unavailableRole);
                await interaction.editReply({ content: 'You are back. Welcome back to the desk 🟢'});
            } else {
                const modRolesToRemove = interaction.member.roles.cache.filter(r => modRoles.includes(r.name));
                if (modRolesToRemove.size > 0) await interaction.member.roles.remove(modRolesToRemove);
                await interaction.member.roles.add(unavailableRole);
                await interaction.editReply({ content: 'You are now shelved. Mod roles removed until you return 🔴'});
        }
        }
        }

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