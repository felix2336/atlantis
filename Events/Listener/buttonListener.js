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
        let maintenance;
        const data = JSON.parse(fs.readFileSync('./maintenance.json', 'utf8'))
        maintenance = data['maintenance']
        if (maintenance == true && interaction.user.id == '773072144304963624') return button.execute(interaction, client)
        if (maintenance == true) return interaction.reply({ content: 'Der Bot befindet sich gerade in Wartungsarbeiten. Daher können keine Buttons verwendet werden.', ephemeral: true })

        button.execute(interaction, client);

    }
}