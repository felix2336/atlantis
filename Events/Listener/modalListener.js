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
        let maintenance;
        const data = JSON.parse(fs.readFileSync('./maintenance.json', 'utf8'))
        maintenance = data['maintenance']
        if (maintenance == true && interaction.user.id == '773072144304963624') return modal.execute(interaction, client)
        if (maintenance == true) return interaction.reply({ content: 'Der Bot befindet sich gerade in Wartungsarbeiten. Daher können keine Buttons verwendet werden.', ephemeral: true })

        modal.execute(interaction, client);

    }
}