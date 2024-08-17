import { ActionRowBuilder, ButtonBuilder } from 'discord.js'
export const ticketButtons = new ActionRowBuilder<ButtonBuilder>().addComponents([
    new ButtonBuilder({
        customId: 'close-with-reason',
        label: '🔒 Schließen mit Begründung',
        style: 4
    }),
    new ButtonBuilder({
        customId: 'claim',
        label: '🙋‍♂️ Beanspruchen',
        style: 3
    })
])