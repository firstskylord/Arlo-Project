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

            const GuideWelcImgEmbed = new EmbedBuilder() // Welcome Image Embed for the 📖・guide channel
                .setColor(`#B0E4CC`)
                .setImage(`https://media.discordapp.net/attachments/1180848523051270216/1488082590903566426/Welcome_Embed.png?ex=69cb7c68&is=69ca2ae8&hm=9ba68cb684f36cab61073ff2f79d44f228522269979525b4df6712b298f1ee89&=&format=webp&quality=lossless`);

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

            const GuideRulesImgEmbed = new EmbedBuilder() // Rules Image Embed for the 📖・guide channel
                .setColor(`#B0E4CC`)
                .setImage(`https://media.discordapp.net/attachments/1180848523051270216/1488082589142220912/Rules_Embed.png?ex=69cb7c68&is=69ca2ae8&hm=bebe6c0d74fa6650045a4a08ac9ef896a8a10353e683465565cca02f9f7e69b4&=&format=webp&quality=lossless`);

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

            const GuideSerChaImgEmbed = new EmbedBuilder() // Server Categories Image Embed for the 📖・guide channel
                .setColor(`#B0E4CC`)
                .setImage(`https://media.discordapp.net/attachments/1180848523051270216/1488082589540548700/Server_Categories_Embed.png?ex=69cb7c68&is=69ca2ae8&hm=c3366b7aeac03674f3fc709e7d2315fd1d3d51898c1cdf17f59c563d9d1cce99&=&format=webp&quality=lossless`);

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

            const GuideTeamImgEmbed = new EmbedBuilder() // Team Image Embed for the 📖・guide channel
                .setColor(`#B0E4CC`)
                .setImage(`https://media.discordapp.net/attachments/1180848523051270216/1488082589884616857/Team_Embed.png?ex=69cb7c68&is=69ca2ae8&hm=c69ca445a4d0eada4bc4b349dc4d79e509765527567921dae3e667e74748101d&=&format=webp&quality=lossless`);

            const GuideTeamEmbed = new EmbedBuilder() // Welcome Embed for the 📖・guide channel
                .setTitle('🗝️ The Editors — Meet the Team')
                .setDescription(`Nova Archives runs because real people keep the lights on.

If you have a question, a concern, a suggestion, or just want to tell someone the server helped you finish a chapter — the team is here for it.

Reach out by tagging a staff role, sliding into a staff member's DMs if they're open, or using the **/report** command for anything that needs formal attention.
Moderation won't be able to handle issues through member-to-member DMs — if something goes wrong in a DM conversation with another member, report it directly to Discord's Trust & Safety.`)
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
            await GuideChannel.send({ embeds: 
                    [GuideWelcImgEmbed, 
                    GuideWelcEmbed, 
                    GuideRulesImgEmbed, 
                    GuideRulesEmbed, 
                    GuideSerChaImgEmbed, 
                    GuideSerChaEmbed, 
                    GuideTeamImgEmbed,
                    GuideTeamEmbed]
                });
                    message.react('🫡');
        }

        if(message.content.toLowerCase().includes('arlo, update staff')) { // Embed for the 📋・staff-info channel
            const ModRoles = ['✦ Quill Master'];
            const hasRole = message.member.roles.cache.some(r => ModRoles.includes(r.name));
            if (!hasRole) return;
        
            const StaffInfoImgEmbed = new EmbedBuilder() // Staff Info Image Embed for the 📋・staff-info channel
                .setColor(`#B0E4CC`)
                .setImage(`https://media.discordapp.net/attachments/1180848523051270216/1488082590350049390/Team_Info_Embed.png?ex=69cb7c68&is=69ca2ae8&hm=6a2b34ffa2bf6553ae0473ffdb506760cf4b13f66df973774a876bec4c9838f0&=&format=webp&quality=lossless`);
            
            const StaffInfoEmbed = new EmbedBuilder() // Staff Info Embed for the 📋・staff-info channel
                .setTitle('🗝️ The Quill Council — Nova Archives Staff')
                .setDescription(`These are the people who keep Nova Archives running. Each role carries specific responsibilities and a specific level of trust. If you're reading this as a new staff member, this is who you are now and what that means.`)
                .setColor('#285A48')
                .setFields(
                    {
                        name: `Quill Master`,
                        value: `Owns and runs the server. Last word on everything.`
                    },
                    {
                        name: `Senior Editor`,
                        value: `Senior moderation. Handles the serious stuff and keeps the rest of the team in check.`
                    },
                    {
                        name: `Copy Editor`,
                        value: `Mid-level mod. The ones you'll see most often keeping things in order day to day.`
                    },
                    {
                        name: `Proofreader`,
                        value: `Junior mod. First to respond, learns the ropes, asks before acting when unsure.`
                    },
                    {
                        name: `Event Curator`,
                        value: `**Not a mod.** Plans and runs the server's challenges, sprints, and events.`
                    },
                    {
                        name: `Archivist`,
                        value: `**Not a mod.** Keeps the Library clean, organised, and worth reading.`
                    },
                    {
                        name: `Community Guide`,
                        value: `**Not staff** — just a trusted veteran member. Good first person to ask if you're lost.`
                    }
                )
                .setFooter({ text: 'Roles are earned. Permissions are a tool, not a reward.' });

            const StaffDutiesImgEmbed = new EmbedBuilder() // Staff Duties Image Embed for the 📋・staff-info channel
                .setColor(`#B0E4CC`)
                .setImage(`https://media.discordapp.net/attachments/1180848523051270216/1488164813170409722/Team_Disc_Embed.png?ex=69cbc8fc&is=69ca777c&hm=32eba991e1681002ed3f43fff6d241a93ee9daef471fc08daa6da45e75b20fd2&=&format=webp&quality=lossless`);

            const StaffDutiesAEmbed = new EmbedBuilder() // Staff Duties Embed for the 📋・staff-info channel
                .setTitle('📋 Staff Duties — By Role')
                .setColor('#285A48')
                .setFields(
                    {
                        name: `Quill Master`,
                        value: `- Final approval on all bans
- Manages bot development and Arlo's commands
- Oversees server structure, channel creation, role management
- Approves new staff appointments and removals
- Signs off on major event programming
- **Everything else** managed by Senior Editor, Copy Editors, Proofreaders, Event Curators, and Archivists`
                    },
                    {
                        name: `Senior Editor`,
                        value: `- Reviews escalated reports from Copy Editors and Proofreaders
- Issues permanent bans after consultation
- Monitors overall moderation consistency across the team
- Assists in staff onboarding
- Manages Quill Master responsibilities when they're unavailable
- **Everything else** managed by Copy Editors, Proofreaders, Event Curators, and Archivists`
                    },
                    {
                        name: `Copy Editor`,
                        value: `- First full responder on active reports
- Issues warnings and timeouts independently
- Monitors general channels for rule violations actively
- Keeps report threads updated with actions taken
- Escalates to Senior Editor when necessary
- **Everything else** managed by Proofreaders, Event Curators, and Archivists`
                    },
                    {
                        name: `Proofreader`,
                        value: `- Acknowledges incoming reports promptly
- Handles clear-cut, low-severity rule breaks independently
- Escalates everything ambiguous upward — never guesses on serious cases
- Assists with channel cleanup during spam or raid events
- **Everything else** managed by Event Curators and Archivists`
                    },
                    {
                        name: `Event Curator`,
                        value: `- Pitches and plans server events at least one week in advance
- Posts event info in <#1478811240041021665> and <#1478818559890296833>
- Manages submission intake and announces results
- Coordinates with Archivist on Hall of Fame updates post-challenge`
                    },
                    {
                        name: `Archivist`,
                        value: `- Reviews all Library submissions for content warnings and formatting
- Pins and organises notable work across library channels
- Updates Hall of Fame after each challenge closes
- Flags content violations in library channels to Copy Editors`
                    },
                    {
                        name: `Community Guide`,
                        value: `- Be the first friendly face a new member encounters. Welcome them in <#1478812141313200261> before staff even notices.
- Answer basic questions about the server that new members are too shy to ask staff directly.
- Point people toward the right channel when they post something in the wrong place — gently, not condescendingly.
- Flag anything concerning to a Proofreader or Copy Editor rather than handling it yourself. You have no moderation permissions and shouldn't act like you do.
- Show up consistently in the community spaces — Workshop, Genre Dens, Lounge. Your presence is the job.`
                    }
                );

            const StaffDutiesBEmbed = new EmbedBuilder() // Staff Duties Embed for the 📋・staff-info channel
                .setTitle('📋 Staff Duties — All Hands')
                .setDescription(`Regardless of role, every staff member in Nova Archives is expected to uphold the following.`)
                .setColor('#285A48')
                .setFields(
                    {
                        name: `Presence`,
                        value: `Show up consistently. You don't need to be online every hour, but if you go dark for extended periods without notice, your role will be reviewed. Set your status to unavailable if you need space — don't just disappear.`
                    },
                    {
                        name: `Communication`,
                        value: `Staff decisions happen in #staff-lounge, not in public channels. If you disagree with a moderation call, raise it internally. Never contradict another staff member's decision in front of the general membership.`
                    },
                    {
                        name: `Reports`,
                        value: `Every report that comes into <#> gets a response. Even if the action taken is "reviewed and no action needed," the thread gets closed with a note. No report sits unacknowledged.`
                    },
                    {
                        name: `Escalation`,
                        value: `When in doubt, go up. A wrong call made alone is worse than a right call made together. Proofreaders escalate to Copy Editors. Copy Editors escalate to Senior Editors. Senior Editors consult the Quill Master. The chain exists for a reason.`
                    },
                    {
                        name: `Conduct`,
                        value: `Staff are held to a higher standard than members — not a different set of rules, a higher bar for the same ones. You do not get to have public arguments, post rule-breaking content, or treat your role as social capital. The tag means responsibility, not status.`
                    }
                )
                .setFooter({ text: 'The server is only as good as the people running it.' });

            const StaffCommandsImgEmbed = new EmbedBuilder() // Staff Commands Image Embed for the 📋・staff-info channel
                .setColor(`#B0E4CC`)
                .setImage(`https://media.discordapp.net/attachments/1180848523051270216/1488164813170409722/Team_Disc_Embed.png?ex=69cbc8fc&is=69ca777c&hm=32eba991e1681002ed3f43fff6d241a93ee9daef471fc08daa6da45e75b20fd2&=&format=webp&quality=lossless`);

            const StaffCommandsEmbed = new EmbedBuilder() // Staff Commands Embed for the 📋・staff-info channel
                .setTitle('🤖 Arlo — Staff Commands & Report Handling')
                .setDescription(`Arlo handles the heavy lifting so moderation stays consistent and logged. Here's what you have access to and how to use it.`)
                .setColor('#285A48')
                .setFields(
                    {
                        name: `⚔️ Moderation Commands`,
                        value: 'TBA'
                    },
                    {
                        name: `🧹 Channel Commands`,
                        value: 'TBA'
                    },
                    {
                        name: `📋 How Reports Work`,
                        value: `When a member uses **/report**, Arlo sends a formatted embed into <#${process.env.REPORT_CHANNEL_ID}> containing the reporter's identity, the reported user, the reason given, any message link provided, and any attached evidence.
Arlo then automatically opens a thread inside <#${process.env.REPORT_CHANNEL_ID}> to that message and pings all moderation staff. The thread is where the team discusses the situation, reviews evidence, and decides on action.
Once a decision is reached and action is taken, the staff member handling it posts a brief summary of what was done inside the thread, then closes the thread. Closed threads are archived, not deleted — the record stays.`
                    },
                    {
                        name: `⚠️ A Note on Bans`,
                        value: `No permanent ban is issued by a single staff member acting alone. Proofreaders and Copy Editors flag for a ban, Senior Editors review, and the Quill Master has final word on anything permanent. This keeps the server's moderation defensible and consistent.`
                    }
                    
                )
                .setFooter({ text: 'Arlo logs everything. The audit trail is always there.' });

            const StaffChannelsImgEmbed = new EmbedBuilder() // Staff Channels Embed for the 📋・staff-info channel
                .setColor(`#B0E4CC`)
                .setImage(`https://media.discordapp.net/attachments/1180848523051270216/1488181442214232114/Moderators_Channels_Embed.png?ex=69cbd878&is=69ca86f8&hm=d02da2d6a5337a6da0fd851a47d6e51d5009cbbe372f573e35a1b89d2a344d88&=&format=webp&quality=lossless`);

            const StaffChannelsEmbed = new EmbedBuilder() // Staff Channels Embed for the 📋・staff-info channel
                .setTitle('🏛️ Your Channels — What Lives Where')
                .setDescription(`Staff Wing and Moderation are your private infrastructure. Here's exactly what each channel is for so nothing gets posted in the wrong place.`)
                .setColor('#285A48')
                .setFields(
                    {
                        name: `🏢 Staff Wing`,
                        value: `<#${process.env.STAFFINFO_CHANNEL_ID}> — You're reading it. Static reference. Don't chat here.
<#${process.env.STAFFLOUNGE_CHANNEL_ID}> — Internal team chat. Coordination, discussions, check-ins, decisions. This is where the team lives.
<#${process.env.EDITORSDESK_CHANNEL_ID}> — Long-form planning and documentation. Server proposals, structural decisions, draft announcements before they go public.
<#${process.env.EVENTPLANNING_CHANNEL_ID}> — Event Curator's workspace. Challenge drafts, sprint schedules, read-along planning. All event content lives here before it's published.
<#${process.env.GUIDES_CHANNEL_ID}> — Draft versions of public-facing guide embeds before they're posted. Staff review happens here.
<#${process.env.MEETINGROOM_CHANNEL_ID}> — Voice channel for scheduled staff meetings. Check <#${process.env.STAFFLOUNGE_CHANNEL_ID}> for meeting times.`
                    },
                    {
                        name: `⚖️ Moderation`,
                        value: `<#${process.env.REPORT_CHANNEL_ID}> — Incoming member reports via /report. Every report lands here. Threads open automatically per report. Do not use this channel for general mod chat — that belongs in <#${process.env.STAFFLOUNGE_CHANNEL_ID}>.
<#${process.env.WARN_CHANNEL_ID}> — Bot-maintained. Auto-logs every warning issued, who issued it, and reason.
<#${process.env.MUTE_CHANNEL_ID}> — Bot-maintained. Auto-logs every timeout issued, who issued it, duration, and reason.
<#${process.env.BAN_CHANNEL_ID}> — Bot-maintained. Auto-logs every ban, who issued it, and reason. Review this periodically for consistency.
<#${process.env.EDIT_CHANNEL_ID}> — Bot-maintained. Logs every message edit server-wide. Useful for evidence in report cases.
<#${process.env.DELETION_CHANNEL_ID}> — Bot-maintained. Logs every deleted message server-wide. Cross-reference with reports when needed.`
                    },
                    {
                        name: `⚙️ Development`,
                        value: `<#${process.env.FEATURESUGGESTION_CHANNEL_ID}> — Members submit feature ideas here. Staff can upvote and flag promising ones for the Quill Master.
<#${process.env.GITHUB_CHANNEL_ID}> — Arlo's development updates. Linked to the bot's repository.
<#${process.env.BOTTESTING_CHANNEL_ID}> — Test Arlo commands here before deploying them in live channels. Never test in public channels.
<#${process.env.DEVLOGS_CHANNEL_ID}> — Arlo's changelog. Every update to the bot gets posted here by the Quill Master`
                    }
                )
                .setFooter({ text: `If something doesn't have a home, it goes in #staff-lounge until it does.` });

            const StaffInfoChannel = client.channels.cache.get(process.env.STAFFINFO_CHANNEL_ID);
            await StaffInfoChannel.send({ embeds: 
                    [StaffInfoImgEmbed,
                    StaffInfoEmbed,
                    StaffDutiesImgEmbed,
                    StaffDutiesAEmbed,
                    StaffDutiesBEmbed,]
                });
            await StaffInfoChannel.send({ embeds: [StaffCommandsImgEmbed,
                    StaffCommandsEmbed,
                    StaffChannelsImgEmbed,
                    StaffChannelsEmbed] });
                message.react('🫡');
        }
    });
}