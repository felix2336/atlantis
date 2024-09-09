import { Button } from "dcbot";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } from "discord.js";

export default new Button({
    id: 'clanticket-close',

    async execute(interaction) {
        if (!interaction.memberPermissions!.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: 'Du darfst dieses Ticket nicht schließen', ephemeral: true })
            return
        }
        const row = new ActionRowBuilder<ButtonBuilder>({
            components: [
                new ButtonBuilder({
                    customId: 'close-confirm',
                    label: 'Ticket schließen',
                    style: ButtonStyle.Danger
                }),
                new ButtonBuilder({
                    customId: 'close-decline',
                    label: 'Offen lassen',
                    style: ButtonStyle.Secondary
                })
            ]
        })

        await interaction.reply({ content: 'Sicher, dass du das Ticket schließen möchtest?', components: [row] })
    }
})