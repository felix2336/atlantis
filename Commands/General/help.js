const { CommandInteraction, Client, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const fs = require('fs')

module.exports = {
    name: 'help',
    description: 'Führe diesen Befehl aus, wenn du Hilfe brauchst',
    permission: 'SendMessages',
    options: [
        {
            name: 'casino',
            description: 'Lasse dir alle Befehle zum Casino System anzeigen',
            type: ApplicationCommandOptionType.Subcommand
        },
    ],

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */

    async execute(interaction, client){
        const subcommand = interaction.options.getSubcommand()

        switch(subcommand){
            case 'casino': {
                let fieldArray = [];
                const folder = fs.readdirSync('./Commands/Casino')
                for(const file of folder){
                    const module = require(`../../Commands/Casino/${file}`)
                    const name = module.name
                    const value = module.description
                    fieldArray.push({name, value})
                }
                const embed = new EmbedBuilder({
                    title: '**Casino Hilfe**',
                    description: 'Hier findest du alle Befehle des Casino Systems',
                    fields: fieldArray,
                    color: 0xffc400
                })

                interaction.reply({embeds: [embed]})
            }
        }
    }
}