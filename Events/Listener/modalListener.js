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
        if (!interaction.isModalSubmit()) return;

        const modal = client.modals.get(interaction.customId);
        if (!modal) return interaction.reply({ content: "Etwas ist schiefgelaufen :/", ephemeral: true });
    
        modal.execute(interaction, client);

    }
}