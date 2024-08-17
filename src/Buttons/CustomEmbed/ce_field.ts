import { Button } from 'dcbot'
import { ButtonInteraction, ModalBuilder, TextInputBuilder, ActionRowBuilder } from 'discord.js'

export default new Button({
    id: 'ce_field',

    async execute(interaction: ButtonInteraction) {
        //@ts-ignore
        if (interaction.user.username != interaction.message.embeds[0].author.name) {
            interaction.reply({ content: 'Du darfst an diesem Embed nichts ändern', ephemeral: true })
            return
        } 

        const modal = new ModalBuilder({
            customId: 'ce_field',
            title: 'Feld ändern'
        })

        const fieldnr = new TextInputBuilder({
            label: 'Welches Feld soll geändert werden',
            minLength: 1,
            maxLength: 2,
            customId: 'fieldnr',
            placeholder: '1-25',
            required: true,
            style: 2
        })
        const fieldName = new TextInputBuilder({
            label: 'Was soll der Name des Felds sein?',
            //@ts-ignore
            minlength: 1,
            maxLength: 256,
            customId: 'fieldname',
            required: true,
            style: 1
        })
        const fieldValue = new TextInputBuilder({
            label: 'Was soll in dem Feld stehen?',
            //@ts-ignore
            minlength: 1,
            maxLength: 1024,
            customId: 'fieldvalue',
            required: true,
            style: 2
        })

        const row = new ActionRowBuilder().addComponents(fieldnr)
        const row2 = new ActionRowBuilder().addComponents(fieldName)
        const row3 = new ActionRowBuilder().addComponents(fieldValue)
        //@ts-ignore
        modal.addComponents(row, row2, row3)

        await interaction.showModal(modal)
    }
})