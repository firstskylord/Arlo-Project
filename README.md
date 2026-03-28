# Arlo — Librarian at Nova Archives

Arlo is the custom Discord bot for **Nova Archives** — a writers and readers community server. Built in JavaScript using Discord.js, Arlo handles moderation utilities, writing tools, community interaction, and a few bits of server personality.

---

## Features

### 💬 Message Interactions
Arlo listens to messages and responds contextually.

| Trigger | What Arlo Does |
|---|---|
| Any message containing `arlo` | Reacts with 👀 |
| `Arlo, pin this` (as a reply) | Reacts with 📌 and pins the message containing the command | (Staff Only Command)
| `Arlo, pin it` (as a reply) | Reacts with 📌 and pins the replied message | (Staff Only Command)
| `Arlo, start knitting` | Starts a thread on the message | (Staff Only Command)

> Message interactions marked as **staff only** require one of the following roles:
> `✦ Quill Master`, `Senior Editor`, `Copy Editor`, `Proofreader`, `Event Curator`, or `Archivist`.

---

### ⚡ Slash Commands

| Command | Description |
|---|---|
| `/report` | Report a member to the moderation team. Sends an embed to the staff channel and confirms with an ephemeral reply to the user. |

---

## Project Structure
```
src/
├── events/
    ├── messagaction.js  — All slash command logic
    └── slashcom.js      — All message interaction logic
├── index.js                  — Bot startup and login
└── regist-commands.js      — Slash command registration with Discord API

```

---

## Tech Stack

- [Discord.js v14](https://discord.js.org/)

---

## Notes

- Arlo is currently hosted locally. Remote hosting is not yet configured.
- This bot is built exclusively for **Nova Archives** and is not designed for general use.

---

## Contributing

This is a private community project. If you're a staff member of Nova Archives and have a feature request, use the `#feature-suggestions` channel in the server.

---

*Arlo — Librarian at Nova Archives. Arlo#0488*
