# Arlo — Librarian at Nova Archives

Arlo is the custom Discord bot for **Nova Archives** — a writers and readers community server. Built in JavaScript using Discord.js, Arlo handles moderation utilities, writing tools, community interaction, and a few bits of server personality.

---

## Features

### 💬 Message Interactions
Arlo listens to messages and responds contextually.

| Trigger | What Arlo Does | Comment |
|---|---|---|
| Any message containing `arlo` | Reacts with 👀 | Global Interaction |
| `Arlo, pin this` (as a reply) | Reacts with 📌 and pins the message containing the command | Staff Only Interaction | 
| `Arlo, pin it` (as a reply) | Reacts with 📌 and pins the replied message | Staff Only Interaction | 
| `Arlo, start knitting` | Starts a thread on the message | Staff Only Interaction | 
| `Arlo, Update Guide` | Sends the Guide Embed in Guide Channel | Staff Only Interaction | 
| `Arlo, Update Staff` | Sends the Guide Embed in Specified Channel | Staff Only Interaction | 

> Message interactions marked as **Staff Only Interaction** require one of the following roles:
> `✦ Quill Master`, `Senior Editor`, `Copy Editor`, `Proofreader`, `Event Curator`, or `Archivist`.

---

### ⚡ Slash Commands

| Command | Description | Comment |
|---|---|---|
| `/report` | Report a member to the moderation team. Sends an embed to the staff channel and confirms with an ephemeral reply to the user. | Global Command | 
| `/warn` | Warn a member in the community. Sends an embed to the staff channel and confirms with an ephemeral reply to the moderator. | Staff Only Command | 

> Slash commands marked as **Staff Only Command** require one of the following roles:
> `✦ Quill Master`, `Senior Editor`, `Copy Editor`, `Proofreader`, `Event Curator`, or `Archivist`.
---

## Project Structure
```
src/
├── events/
    ├── editdel.js            — All edited and deleted message logs logic
    ├── intless.js            — All logic for interaction less actions
    ├── messagaction.js       — All slash command logic
    ├── slashcom.js           — All message interaction logic
    └── warnmuteban.js        — All logs and action logic for Warns / Mutes / Bans
├── index.js                  — Bot startup and login
└── regist-commands.js        — Slash command registration with Discord API
.gitignore
README.md
package-lock.json
package.json

```

---

## Tech Stack

  ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=flat&logo=javascript)
  ![discord.js](https://img.shields.io/badge/discord.js-5865F2?style=flat&logo=discord&logoColor=white)
  ![node.js](https://img.shields.io/badge/Node.js-233056?style=flat&logo=node.js)

---

## Notes

- Arlo is currently hosted locally. Remote hosting is not yet configured.
- This bot is built exclusively for **Nova Archives** and is not designed for general use.
- Join the Discord Community: [Nova Archives](https://discord.gg/vj4jmWBftZ)

---
