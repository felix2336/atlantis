const { CommandInteraction, ApplicationCommandOptionType } = require('discord.js')
const fs = require('fs')

module.exports = {
    name: 'casino',
    description: 'Aktiviere oder deaktiviere das Casino System',
    dev: true,
    permission: 'Administrator',
    options: [
        {
            name: 'mode',
            description: 'Was soll getan werden?',
            type: ApplicationCommandOptionType.String,
            options: ['deaktivieren', 'aktivieren'],
            required: true,
        },
    ],

    /**
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction){
        const mode = interaction.options.getString('mode');
        const config = JSON.parse(fs.readFileSync('./System/config.json'))
        switch(mode){
            default: {
                interaction.reply({content: 'Die Eingabe ist ungültig. Bitte gib einen gültigen Wert ein', ephemeral: true})
                break;
            }
            case 'aktivieren': {
                if(config.casino) return interaction.reply({content: 'Das Casino system ist bereits aktiviert.', ephemeral: true})
                config.casino = false
                fs.writeFileSync('./System/config.json', JSON.stringify(config, null, 2), 'utf8')
                interaction.reply({content: 'Das Casino System wurde erfolgreich deaktiviert!', ephemeral: true})
                break;
            }
            case 'deaktivieren': {
                if (!config.casino) return interaction.reply({ content: 'Das Casino system ist bereits deaktiviert.', ephemeral: true })
                config.casino = true
                fs.writeFileSync('./System/config.json', JSON.stringify(config, null, 2), 'utf8')
                interaction.reply({ content: 'Das Casino System wurde erfolgreich aktiviert!', ephemeral: true })
                break;
            }
        }
    }
}