require('dotenv').config();
const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    client.on('guildMemberAdd', async (member) => {
        if (member.user.bot) {return;}

        const welcomeChannel = client.channels.cache.get(process.env.WELCOME_CHANNEL_ID);

        const rolesToAdd = [
            '1479070512331358440', // RANKS ROLE
            '1479073440668319835', // IDENTITY ROLE
            '1479075802011140208', // GENRE ROLE
            '1479076290920186047'  // ABOUT ROLE
        ];

        const welcomeEmbed = new EmbedBuilder()
            .setTitle(`Welcome to the Nova Archives, ${member.user.tag}!`)
            .setDescription(`Start by visiting the <id:home> to guide yourself through the community!`)
            .setImage(`https://media.discordapp.net/attachments/1180848523051270216/1489282923692687360/Welcome_Card.png?ex=69cfda4e&is=69ce88ce&hm=a6de6edc3e4f5f139323be92a9b1685607fada66c39c7d7c753a94f48ffb2177&=&format=webp&quality=lossless`)
            .setColor('#408A71')
            .setTimestamp();

        await member.roles.add(rolesToAdd).catch(console.error);

        await welcomeChannel.send({ embeds: [welcomeEmbed] });
    });

    
}