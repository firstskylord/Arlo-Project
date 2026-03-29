require('dotenv').config();
const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    client.on('messageCreate', async (message) => {

        // Actions performed by the bot through message commands | **Used on regular basis**

        if (message.author.bot) {
            return;
        }

        if (message.content.toLowerCase().includes('arlo')) { // Reacts to messages that contain "Arlo"
            message.react('👀')
        }

        if (message.content.toLowerCase().includes('arlo, pin this')) { // Pins the message that contains the command
            const ModRoles = ['✦ Quill Master', 'Senior Editor', 'Copy Editor', 'Proofreader', 'Event Curator'];
            const hasRole = message.member.roles.cache.some(r => ModRoles.includes(r.name));
            if (!hasRole) return;

            message.react('📌')
                .then(() => message.pin());
        }

        if (message.content.toLowerCase().includes('arlo, pin it')) { // Pins the message that the command message is replying to
            const ModRoles = ['✦ Quill Master', 'Senior Editor', 'Copy Editor', 'Proofreader', 'Event Curator'];
            const hasRole = message.member.roles.cache.some(r => ModRoles.includes(r.name));
            if (!hasRole) return;

            if (!message.reference) return message.reply('Reply to a message for me to pin it.');

            const targetMessage = await message.channel.messages.fetch(message.reference.messageId);
            await targetMessage.pin();
                message.react('📌');
        }

        if (message.content.toLowerCase().includes('arlo, start knitting')) { // Starts a thread with the message that contains the command
            const ModRoles = ['✦ Quill Master', 'Senior Editor', 'Copy Editor', 'Proofreader', 'Event Curator', 'Archivist'];
            const hasRole = message.member.roles.cache.some(r => ModRoles.includes(r.name));
            if (!hasRole) return;

            message.react('🧶')
                .then(() => message.startThread({
                    name: `New Thread with ${message.author.username}`,
                    autoArchiveDuration: 1440, // 24 hours
                }))
                .then(thread => {
                    thread.send(`🧶 Thread started by ${message.author}.
I request <@&1479068137616834754>, <@&1479068546054230016>, <@&1479069863103172770>, <@&1479070225361272884>, <@&1479070290800545944>, <@&1479070354264821770> to join the thread to assist with the request.`);
                });
        }

        if (message.channelId === process.env.INTRODUCTION_CHANNEL_ID) { // Reacts to messages in #🖋️・introduction channel
            message.react('👋🏻');
        }

        if (message.channelId === process.env.MILESTONES_CHANNEL_ID) { // Reacts to messages in #🎉・milestones channel
            message.react('👏🏻')
                .then(() => message.react('🎉'));
        }

        // Embeds sent through request in specific channels | **Used rarely**
        
        if(message.content.toLowerCase().includes('arlo, update guide')) { // Embed for the 📖・guide channel
            const ModRoles = ['✦ Quill Master', 'Senior Editor'];
            const hasRole = message.member.roles.cache.some(r => ModRoles.includes(r.name));
            if (!hasRole) return;

            const GuideWelcEmbed = new EmbedBuilder() // Welcome Embed for the 📖・guide channel
                .setTitle('🕯️ Welcome to Nova Archives')
                .setDescription(`You've just walked into a space built for people who hear voices in their heads and call it writing.

**Nova Archives** is a community for writers, readers, and everyone caught somewhere between the two. Whether you're mid-chapter, mid-crisis, or haven't started yet — **you belong here**.

Here's where to begin:

- 📌 Read the rules in <#1478444078227132664>
- 🎭 Grab your roles in <id:customize>
- 👋 Say hello in <#1478812141313200261>
- 🖊️ Tell us who you are in <#1478809803097772231>

The blank page is less terrifying with people around it. Now go write something.`)
                
                .setColor('#285A48')
                .setFooter({ 
                    text: 'Nova Archives — Est. 2026',
                });

            const GuideRulesEmbed = new EmbedBuilder() // Rules Embed for the 📖・guide channel
                .setTitle('📜 The Codex — Server Rules')
                .setDescription(`These aren't restrictions. They're the reason this place stays worth being in.`)
                .setFields(
                    {
                        name: 'Conduct',
                        value: `1. Treat every member with basic respect. Harassment, targeted mockery, and personal attacks are grounds for an immediate ban.
2. No hate speech, slurs, or discrimination of any kind — against gender, race, religion, sexuality, nationality, or any other identity.
3. No threats, whether in chat, voice, or direct messages.
4. Keep political debates out of the server. Mention it in passing, fine. Making it the topic, not here.
5. No unsolicited DMs to other members for promotional or personal purposes.`
                    },
                    {
                        name: 'Content',
                        value: `6. Content warnings are mandatory on any writing containing dark themes — violence, trauma, death, mental illness, sexual content. No exceptions. Label it before you post it.
7. No NSFW content inside the server.
8. No plagiarism. Do not post another writer's work as your own, anywhere in this server. This includes AI-generated text presented as original work without disclosure.
9. Critique must be constructive. You are here to help a writer improve, not to perform your own taste. Cruel feedback will be removed and the poster warned.
10. Spoilers for books, ongoing stories, and server fiction must be tagged. If the channel has no spoiler culture, use ||spoiler tags||.`
                    },
                    {
                        name: 'Channels & Bot',
                        value: `11. Use channels for their intended purpose. The channel descriptions exist for a reason.
12. Do not spam, flood, or abuse Arlo. Bot commands belong in <#1487820032179437770>.
13. No advertising, self-promotion, or server invites inside the server.
14. Share your Wattpad, AO3, Substack, blog in <#1479413971181240390>. One post per author, kept updated`
                    }
                )
                .setColor('#285A48')
                .setFooter({ 
                    text: 'Breaking these rules once gets a warning. Twice gets a timeout. The third time writes its own ending.',
                });

                const GuideSerChaEmbed = new EmbedBuilder() // Server Categories Embed for the 📖・guide channel
                .setTitle('🗺️ The Map — How Nova Archives Works')
                .setDescription(`A lot of channels. Not a single one is filler. Here's what lives where.`)
                .setFields(
                    {
                        name: `🕯️ — Entrance Hall`,
                        value: `Start here every time you're new.`
                    },
                    {
                        name: `📜 — Notice Board`,
                        value: `What's happening in and around the server.`
                    },
                    {
                        name: `🎖️ — Author's Desk`,
                        value: `This is where Nova Archives' own stories live.`
                    },
                    {
                        name: `☕ — Reading Lounge`,
                        value: `The off-duty room. No word counts required.`
                    },
                    {
                        name: `✒️ — Writing Workshop`,
                        value: `The working heart of the server. Bring your drafts and your disasters.`
                    },
                    {
                        name: `📚 — Library`,
                        value: `Finished and polished work only. Read with care.`
                    },
                    {
                        name: `🔬 — Craft & Technique`,
                        value: `The mechanics behind the magic.`
                    },
                    {
                        name: `🌌 — Genre Dens`,
                        value: `Find your people. Each den has its own dialect and obsessions.`
                    },
                    {
                        name: `🌿 — Wellbeing`,
                        value: `Writing is emotional work. Take care of the person doing it.`
                    },
                    {
                        name: `🎪 — Events`,
                        value: `Structured madness. Deadlines by choice.`
                    },
                    {
                        name: `🎙️ — Voice Chambers`,
                        value: `Writing doesn't have to be solitary.`
                    },
                )
                .setColor('#285A48')
                .setFooter({ 
                    text: `Still lost? Ask in #💬・general-chat or reach the team.`,
                });

                const GuideTeamEmbed = new EmbedBuilder() // Welcome Embed for the 📖・guide channel
                .setTitle('🗝️ The Editors — Meet the Team')
                .setDescription(`Nova Archives runs because real people keep the lights on.
If you have a question, a concern, a suggestion, or just want to tell someone the server helped you finish a chapter — the team is here for it.
Reach out by tagging a staff role, sliding into a staff member's DMs if they're open, or using the /report command for anything that needs formal attention. Moderation won't be able to handle issues through member-to-member DMs — if something goes wrong in a DM conversation with another member, report it directly to Discord's Trust & Safety.`)
                .setFields(
                    {
                        name: `Quill Master`,
                        value: `- <@1170766918815318077>`
                    },
                    {
                        name: `Senior Editor`,
                        value: `- 🗅`
                    },
                    {
                        name: `Copy Editor`,
                        value: `- 🗅`
                    },
                    {
                        name: `Proofreader`,
                        value: `- 🗅`
                    },
                    {
                        name: `Event Curator`,
                        value: `- <@${process.env.OG_EVENT_CURATOR_ID}>`
                    },
                    {
                        name: `Archivist`,
                        value: `- 🗅`
                    },
                )
                .setColor('#285A48')
                .setFooter({ 
                    text: 'The team is here to keep this place worth staying in — not to police your creativity.',
                });

                const GuideChannel = client.channels.cache.get(process.env.GUIDE_CHANNEL_ID);
                await GuideChannel.send({ embeds: [
                    GuideWelcEmbed, GuideRulesEmbed, GuideSerChaEmbed, GuideTeamEmbed
                ] });
                    message.react('🫡');
        }


    });
}