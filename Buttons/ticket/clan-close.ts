import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, PermissionFlagsBits } from "discord.js";

export default {
    id: 'clanticket-close',

    async execute(interaction: ButtonInteraction){
        if(!interaction.memberPermissions!.has(PermissionFlagsBits.Administrator)) return interaction.reply({content: 'Du darfst dieses Ticket nicht schließen', ephemeral: true})
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

        await interaction.reply({content: 'Sicher, dass du das Ticket schließen möchtest?', components: [row]})
    }
}