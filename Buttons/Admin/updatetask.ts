import { Button } from 'dcbot'
import { ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js'

export default new Button( {
    id: 'task_update',

    async execute(interaction: ButtonInteraction){
        const embed = interaction.message.embeds[0]
        const userId = embed.fields[0].value.split('@')[1].split('>')[0]

        if(interaction.user.id != userId) {
            interaction.reply({content: 'Nur der User, der die Task geclaimt hat, kann ein Update posten', ephemeral: true})
            return
        }  

        const modal = new ModalBuilder({
            title: 'Update zur Task posten',
            customId: 'update_task',
        })

        const updateField = new TextInputBuilder({
            label: 'Was hast du geändert?',
            maxLength: 1024,
            style: TextInputStyle.Paragraph,
            customId: 'update',
            required: true
        })
        const row = new ActionRowBuilder().addComponents(updateField)
        //@ts-ignore
        modal.addComponents(row)

        await interaction.showModal(modal)
    }
})