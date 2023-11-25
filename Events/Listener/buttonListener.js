const { ButtonInteraction, Client } = require("discord.js")
const fs = require('fs')

module.exports = {
    name: "interactionCreate",

    /**
     * @param {ButtonInteraction} interaction
     * @param {Client} client
     */

    async execute(interaction, client) {
        if (interaction == undefined) return;
        if (!interaction.isButton()) return;
        
        const button = client.buttons.get(interaction.customId);
        if (!button) return interaction.reply({ content: "Etwas ist schiefgelaufen :/", ephemeral: true });
        
        button.execute(interaction, client);

    }
}