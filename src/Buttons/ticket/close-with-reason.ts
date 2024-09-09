import { Button } from "dcbot";
import { ModalBuilder, TextInputBuilder, ActionRowBuilder } from "discord.js";

export default new Button({
    id: 'close-with-reason',

    async execute(interaction) {
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
})