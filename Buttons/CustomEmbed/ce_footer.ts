import { ActionRowBuilder } from '@discordjs/builders'
import { Button } from 'dcbot'
import {ButtonInteraction, ModalBuilder, TextInputBuilder, } from 'discord.js'

export default new Button( {
    id: 'ce_footer',

    async execute(interaction: ButtonInteraction){
        if (interaction.user.username != interaction.message.embeds[0].author!.name) {
            interaction.reply({ content: 'Du darfst an diesem Embed nichts ändern', ephemeral: true })
            return
        } 

        const modal = new ModalBuilder({
            title: 'Footer ändern',
            customId: 'ce_footer'
        })

        const text = new TextInputBuilder({
            customId: 'text',
            maxLength: 2048,
            minLength: 1,
            required: true,
            label: 'Was soll im Footer stehen?',
            style: 1
        })

        const iconurl = new TextInputBuilder({
            label: 'Gib hier die URL zum icon für den footer ein',
            customId: 'url',
            required: false,
            style: 1
        })

        const row = new ActionRowBuilder().addComponents(text)
        const row2 = new ActionRowBuilder().addComponents(iconurl)
        //@ts-ignore
        modal.addComponents(row, row2)
        await interaction.showModal(modal)
    }
})