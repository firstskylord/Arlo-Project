require('dotenv').config()
const { EmbedBuilder } = require('discord.js')

module.exports = (client) => {
  // Warning users logic
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    if (interaction.commandName === 'warn') {
      const WarnEmbed = new EmbedBuilder()
        .setTitle('⚠️・A Warning has been issued!')
        .setDescription(
          `**${interaction.user} has warned ${interaction.options.getUser('user')}** for misconduct of rules.`,
        )
        .setColor('#285A48')
        .setFields(
          {
            name: '👤・Warner Details',
            value: `Usertag: ${interaction.user.tag}
User ID: ${interaction.user.id}`,
            inline: true,
          },
          {
            name: '👤・Warnee Details',
            value: `Usertag: ${interaction.options.getUser('user').tag}
User ID: ${interaction.options.getUser('user').id}`,
            inline: true,
          },
          {
            name: '💳・Reason',
            value: `${interaction.options.getString('reason')}`,
            inline: false,
          },
          {
            name: '🔗・Message Link',
            value: `${interaction.options.getString('message-link') || 'N/A'}`,
            inline: false,
          },
        )
        .setThumbnail(interaction.options.getUser('user').displayAvatarURL())
        .setFooter({
          text: 'Arlo is always watching',
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setTimestamp()

      const warnChannel = interaction.client.channels.cache.get(
        process.env.WARN_CHANNEL_ID,
      )
      await warnChannel.send({
        content: `A warning has been issued to <@${interaction.options.getUser('user').id}>.`,
      })
      await warnChannel.send({
        embeds: [WarnEmbed],
      })

      await interaction.reply({
        content: `<@${interaction.options.getUser('user').id}> has been warned. Rest free, ${interaction.user.tag}!`,
        flags: 64,
      })
    }

    if (interaction.commandName === 'mute') {
      const MuteEmbed = new EmbedBuilder()
        .setTitle('🔇・A User has been Muted!')
        .setDescription(
          `**${interaction.user} has muted ${interaction.options.getUser('user')}** for misconduct of rules.`,
        )
        .setColor('#285A48')
        .setFields(
          {
            name: '👤・Muter Details',
            value: `Usertag: ${interaction.user.tag}
User ID: ${interaction.user.id}`,
            inline: true,
          },
          {
            name: '👤・Mutee Details',
            value: `Usertag: ${interaction.options.getUser('user').tag}
User ID: ${interaction.options.getUser('user').id}`,
            inline: true,
          },
          {
            name: '⏱️・Duration',
            value: `${interaction.options.getInteger('duration')} minutes`,
            inline: false,
          },
          {
            name: '💳・Reason',
            value: `${interaction.options.getString('reason')}`,
            inline: false,
          },
          {
            name: '🔗・Message Link',
            value: `${interaction.options.getString('message-link') || 'N/A'}`,
            inline: false,
          },
        )
        .setThumbnail(interaction.options.getUser('user').displayAvatarURL())
        .setFooter({
          text: 'Arlo is always watching',
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setTimestamp()

      const muteChannel = interaction.client.channels.cache.get(
        process.env.MUTE_CHANNEL_ID,
      )
      await muteChannel.send({
        content: `<@${interaction.options.getUser('user').id}> has been muted.`,
      })
      await muteChannel.send({
        embeds: [MuteEmbed],
      })

      const muteTarget = await interaction.guild.members.fetch(
        interaction.options.getUser('user').id,
      )
      await muteTarget.roles.add(process.env.MUTE_ROLE_ID).catch(console.error)

      const duration = interaction.options.getInteger('duration')
      const reason = interaction.options.getString('reason')

      // DM the muted user
      await muteTarget
        .send({
          embeds: [
            new EmbedBuilder()
              .setTitle('🔇 You have been muted in Nova Archives')
              .setDescription(
                `You have been muted for **${duration} minute(s)**.\n**Reason:** ${reason || 'No reason provided'}`,
              )
              .setColor('#285A48')
              .setTimestamp()
              .setFooter({
                text: 'Comply with the rules and you will be unmuted.',
              }),
          ],
        })
        .catch(() =>
          console.log('Could not DM muted user — DMs likely closed.'),
        )

      // Wait for duration then remove role and DM again
      setTimeout(
        async () => {
          await muteTarget.roles
            .remove(process.env.MUTE_ROLE_ID)
            .catch(console.error)

          await muteTarget
            .send({
              embeds: [
                new EmbedBuilder()
                  .setTitle('🔊 You have been unmuted in Nova Archives')
                  .setDescription(
                    `Your mute of **${duration} minute(s)** has expired. Welcome back.`,
                  )
                  .setColor('#408A71')
                  .setTimestamp()
                  .setFooter({
                    text: 'Please keep the rules in mind going forward.',
                  }),
              ],
            })
            .catch(() =>
              console.log('Could not DM unmuted user — DMs likely closed.'),
            )
        },
        duration * 60 * 1000,
      )

      await interaction.reply({
        content: `<@${interaction.options.getUser('user').id}> has been muted. Rest free, ${interaction.user.tag}!`,
        flags: 64,
      })
    }

    if (interaction.commandName === 'ban') {
      await interaction.deferReply({ ephemeral: true })

      const BanEmbed = new EmbedBuilder()
        .setTitle('🔨・A User has been Banned!')
        .setDescription(
          `**${interaction.user} has banned ${interaction.options.getUser('user')}** for misconduct of rules.`,
        )
        .setColor('#285A48')
        .setFields(
          {
            name: '👤・Banner Details',
            value: `Usertag: ${interaction.user.tag}
User ID: ${interaction.user.id}`,
            inline: true,
          },
          {
            name: '👤・Banned User Details',
            value: `Usertag: ${interaction.options.getUser('user').tag}
User ID: ${interaction.options.getUser('user').id}`,
            inline: true,
          },
          {
            name: '💳・Reason',
            value: `${interaction.options.getString('reason')}`,
            inline: false,
          },
          {
            name: '🔗・Message Link',
            value: `${interaction.options.getString('message-link') || 'N/A'}`,
            inline: false,
          },
        )
        .setThumbnail(interaction.options.getUser('user').displayAvatarURL())
        .setFooter({
          text: 'Arlo is always watching',
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setTimestamp()

      const banChannel = interaction.client.channels.cache.get(
        process.env.BAN_CHANNEL_ID,
      )
      await banChannel.send({
        content: `<@${interaction.options.getUser('user').id}> has been banned.`,
      })
      await banChannel.send({
        embeds: [BanEmbed],
      })

      const banTarget = await interaction.guild.members.fetch(
        interaction.options.getUser('user').id,
      )
      await banTarget
        .ban({
          reason:
            interaction.options.getString('reason') || 'No reason provided',
        })
        .catch(console.error)

      // DM the banned user
      await banTarget
        .send({
          embeds: [
            new EmbedBuilder()
              .setTitle('🔨 You have been banned in Nova Archives')
              .setDescription(
                `You have been banned from Nova Archives.\n${interaction.options.getString('reason') || 'No reason provided'}\nContact the moderators for more information.`,
              )
              .setColor('#285A48')
              .setTimestamp()
              .setFooter({
                text: 'Thank you for your experience in Nova Archives.',
              }),
          ],
        })
        .catch(() =>
          console.log('Could not DM banned user — DMs likely closed.'),
        )

      await interaction.editReply({
        content: `<@${interaction.options.getUser('user').id}> has been banned. Rest free, ${interaction.user.tag}!`,
        flags: 64,
      })
    }
  })
}
