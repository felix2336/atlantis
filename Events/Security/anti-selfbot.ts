import { ActionRowBuilder, ButtonBuilder, Colors, EmbedBuilder, Events, Message } from 'discord.js'
import { Roles } from '../../contents'

export default {
    name: Events.MessageCreate,

    async execute(message: Message) {
        if (message.author.bot) return;
        if (message.member?.roles.cache.has(Roles.staff)) return;
        const { content } = message
        if (!message.member?.roles.cache.has(Roles.staff) && content.includes('@everyone') && content.includes('discord.gg/')) {
            await message.delete()
            await message.member?.ban({ deleteMessageSeconds: 3600, reason: "Sent discord invite and pinged everyone" }).catch(async err => {
                await message.member?.timeout(3600, 'Sent discord invite and pinged everyone')
            })
            const embed = new EmbedBuilder({
                title: 'Gebannt',
                description: 'Es scheint so, als wäre dein Account ein Selfbot, welcher Werbung für NSFW Server mit @everyone Pings macht.\nDaher wurdest du aus Sicherheitsgründen gebannt.\n\nWenn dein Account kein Selfbot ist, kannst du mit dem unten stehenden Button einen Entbannungsantrag stellen!',
                color: Colors.DarkRed,
                timestamp: new Date(),
                footer: { text: 'Sicherheitsbann' }
            })
            const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
                new ButtonBuilder({
                    label: 'Entbannungsantrag',
                    customId: 'unban-request',
                    style: 1,
                })
            ])

            await message.member!.send({ embeds: [embed], components: [row] })
            .catch(err => {
                console.log(err)
            })
        }
    }
}