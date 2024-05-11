import { ButtonInteraction, ModalBuilder, TextInputBuilder, ActionRowBuilder } from "discord.js";

export default {
    id: 'close-with-reason',

    async execute(interaction: ButtonInteraction) {
        const modal = new ModalBuilder({
            title: 'Ticket mit Begründung schließen',
            customId: 'close-with-reason',
            components: [
                new ActionRowBuilder<TextInputBuilder>({
                    components: [
                        new TextInputBuilder({
                            label: 'Begründung für die Schließung',
                            maxLength: 1024,
                            required: true,
                            style: 1,
                            customId: 'reason'
                        })
                    ]
                })
            ]
        })

        await interaction.showModal(modal)
    }
}