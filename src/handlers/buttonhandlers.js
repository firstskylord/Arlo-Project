require('dotenv').config();
const { Events } = require('discord.js');
const { prompts, getRandom } = require('../data/prompts');

module.exports = (client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isButton()) return;

    let label = "";
    let value = "";

    switch (interaction.customId) {

      // 🎭 Fragment
      case "protagtype":
        label = "Protagonist Type";
        value = getRandom(prompts.fragment.protagonist);
        break;

      case "setting":
        label = "Setting";
        value = getRandom(prompts.fragment.setting);
        break;

      case "conflict":
        label = "Conflict";
        value = getRandom(prompts.fragment.conflict);
        break;

      case "goal":
        label = "Goal";
        value = getRandom(prompts.fragment.goal);
        break;

      case "theme":
        label = "Theme";
        value = getRandom(prompts.fragment.theme);
        break;

      case "twist":
        label = "Twist";
        value = getRandom(prompts.fragment.twist);
        break;

      case "genall":
        label = "Full Prompt";
        value =
          `Protagonist: ${getRandom(prompts.fragment.protagonist)}\n` +
          `Setting: ${getRandom(prompts.fragment.setting)}\n` +
          `Conflict: ${getRandom(prompts.fragment.conflict)}\n` +
          `Goal: ${getRandom(prompts.fragment.goal)}\n` +
          `Theme: ${getRandom(prompts.fragment.theme)}\n` +
          `Twist: ${getRandom(prompts.fragment.twist)}`;
        break;

      // ⛓️ Constraint
      case "limitation":
        label = "Limitation";
        value = getRandom(prompts.constraint.limitation);
        break;

      case "timelimit":
        label = "Time Constraint";
        value = getRandom(prompts.constraint.time);
        break;

      case "style":
        label = "Style Rule";
        value = getRandom(prompts.constraint.style);
        break;

      case "tone":
        label = "Tone";
        value = getRandom(prompts.constraint.tone);
        break;

      case "all_limit":
        label = "All Constraints";
        value =
          `Limitation: ${getRandom(prompts.constraint.limitation)}\n` +
          `Time: ${getRandom(prompts.constraint.time)}\n` +
          `Style: ${getRandom(prompts.constraint.style)}\n` +
          `Tone: ${getRandom(prompts.constraint.tone)}`;
        break;

      // 🎲 Wildcard
      case "object":
        label = "Object";
        value = getRandom(prompts.wildcard.object);
        break;

      case "character":
        label = "Character";
        value = getRandom(prompts.wildcard.character);
        break;

      case "mood":
        label = "Mood";
        value = getRandom(prompts.wildcard.mood);
        break;

      case "genflip":
        label = "Genre Flip";
        value = getRandom(prompts.wildcard.genre);
        break;

      case "randall":
        label = "Random Everything";
        value =
          `Object: ${getRandom(prompts.wildcard.object)}\n` +
          `Character: ${getRandom(prompts.wildcard.character)}\n` +
          `Mood: ${getRandom(prompts.wildcard.mood)}\n` +
          `Genre: ${getRandom(prompts.wildcard.genre)}`;
        break;

      default:
        return;
    }

    await interaction.reply({
      content: `**Your ${label}:**\n${value}`,
      ephemeral: true
    });
  });
};