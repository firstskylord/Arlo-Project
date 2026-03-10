require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'wordgoal',
        description: 'Set your Daily word goal',
        options: [
            {
                name: 'target',
                description: 'Enter your daily word goal',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
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