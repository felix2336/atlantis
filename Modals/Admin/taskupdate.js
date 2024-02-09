const { ModalSubmitInteraction } = require('discord.js')

module.exports = {
    id: 'update_task',

    /**
     * @param {ModalSubmitInteraction} interaction 
     */

    async execute(interaction){
        const update = interaction.fields.getTextInputValue('update')

        await interaction.reply({content: 'Das Update wurde gepostet', ephemeral: true})

        interaction.message.embeds[0].fields.push({name: `Update vom ${new Date().toLocaleDateString()}`, value: update})
        await interaction.message.edit({embeds: [interaction.message.embeds[0]]})
    }
}