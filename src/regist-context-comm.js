require('dotenv').config();
const { ContextMenuCommandBuilder, ApplicationCommandType, REST, Routes } = require('discord.js');

const commandsData = [
    new ContextMenuCommandBuilder()
        .setName('User Information')
        .setType(ApplicationCommandType.User),

    new ContextMenuCommandBuilder()
        .setName('Message Information')
        .setType(ApplicationCommandType.Message),
];

const rest = new REST().setToken(process.env.ARLO_TOKEN);

(async () => {
    try {
        console.log(`👷🏻‍♂️ Registering Context Menu Commands...`);

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commandsData },
        )

        console.log(`✅ Context Menu Commands Registered!`);
    } catch (error) {
        console.error(error);
    }
})();