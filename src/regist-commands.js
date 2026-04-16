require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'report',
        description: 'Report a user for misconduct of rules',
        options: [
            {
                name: 'user',
                description: 'Select the user to report',
                type: ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: 'reason',
                description: 'State your reason. Check #📖・guide for the full list of reportable offences.',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'message-link',
                description: 'Provide a link to the message that violates the rules (if applicable)',
                type: ApplicationCommandOptionType.String,
                required: false,
            },
            {
                name: 'evidence',
                description: 'Provide evidence for the report (screenshot, video, etc.)',
                type: ApplicationCommandOptionType.Attachment,
                required: false,
            },
        ],
    },
    {
        name: 'warn',
        description: 'Warn a user for misconduct of rules',
        options: [
            {
                name: 'user',
                description: 'Select the user to warn',
                type: ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: 'reason',
                description: 'State your reason.',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'message-link',
                description: 'Provide a link to the message that violates the rules (if applicable)',
                type: ApplicationCommandOptionType.String,
                required: false,
            },
        ],
    },
    {
        name: 'speak-embed',
        description: 'Lets the user speak through the bot by sending an embed message.',
        options: [
            {
                name: 'title',
                description: 'Enter the title for the embed message',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'description',
                description: 'Enter the description for the embed message',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'thumbnail',
                description: 'Provide a link to the thumbnail for the embed message',
                type: ApplicationCommandOptionType.String,
                required: false,
            },
            {
                name: 'image',
                description: 'Provide a link to the image for the embed message',
                type: ApplicationCommandOptionType.String,
                required: false,
            },
            {
                name: 'url',
                description: 'Provide a link to the title for the embed message',
                type: ApplicationCommandOptionType.String,
                required: false,
            }
        ],
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.ARLO_TOKEN);

(async () => {
    try {
        console.log(`👷🏻‍♂️ Registering slash commands...`);

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        )

        console.log(`✅ Slash commands registered!`);
    } catch (error) {
        console.log(`An Error has been encountered: ${error}`);
    }
})();