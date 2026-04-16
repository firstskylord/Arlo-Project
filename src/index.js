require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`🤖 Logged in as ${c.user.tag}`);
});

require('./events/messagaction.js')(client);
require('./events/slashcom.js')(client);
require('./events/editdel.js')(client);
require('./events/warnmuteban.js')(client);
require('./events/intless.js')(client);

client.login(process.env.ARLO_TOKEN);
