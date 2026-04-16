require('dotenv').config();
const { Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActivityType } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

let status = [
    {
        name: 'Curating Nova Archives ✨',
        type: ActivityType.Custom,
    },
    {
        name: 'Pressing flowers between pages',
        type: ActivityType.Custom,
    },
    {
        name: 'Watching ink dry',
        type: ActivityType.Custom,
    },
    {
        name: 'Someone left a cliffhanger unfinished...',
        type: ActivityType.Custom,
    },
    {
        name: 'Reading between your lines',
        type: ActivityType.Custom,
    },
    {
        name: 'Believing in your chapter three',
        type: ActivityType.Custom,
    },
    {
        name: 'Some stories begin before the first page',
        type: ActivityType.Custom,
    },
]

client.on('clientReady', (c) => {
    console.log(`🤖 Logged in as ${c.user.tag}`);

    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
    }, 60000);
});

require('./events/messagaction.js')(client);
require('./handlers/slashcom.js')(client);
require('./events/editdel.js')(client);
require('./events/warnmuteban.js')(client);
require('./events/intless.js')(client);
require('./handlers/interactionHandlers.js')(client);

client.login(process.env.ARLO_TOKEN);
