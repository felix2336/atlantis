import { Button } from 'dcbot'
import { ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder } from 'discord.js'

export default new Button({
    id: 'unban-request',

    async execute(interaction: ButtonInteraction) {
        const modal = new ModalBuilder({
            customId: 'unban-request',
            title: 'Entbannungsantrag',
            components: [
                new ActionRowBuilder<TextInputBuilder>().addComponents([
                    new TextInputBuilder({
                        customId: 'ban-reason',
                        label: 'Warum wurdest du gebannt?',
                        style: 1,
                        required: true,
                    })
                ]),
                new ActionRowBuilder<TextInputBuilder>().addComponents([
                    new TextInputBuilder({
                        customId: 'unban-reason',
                        label: 'Warum möchtest du entbannt werden?',
                        style: 2,
                        required: true,
                        placeholder: 'Bitte schreibe ganze Sätze'
                    })
                ])
            ]
        })

        await interaction.showModal(modal)
    }
})