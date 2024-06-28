import { Colors, EmbedBuilder, Events, Message } from 'discord.js'
import { Roles, unbanRequestButton } from '../../contents'
import { Event } from 'dcbot'

export default new Event( {
    name: Events.MessageCreate,

    async execute(client, message: Message) {
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
                description: 'Du wurdest automatisch gebannt, da du einen Invite geschickt hast und @everyone gepingt hast.\n\nDu kannst mit dem Button unten einen Entbannungsantrag stellen.',
                color: Colors.DarkRed,
                timestamp: new Date(),
                footer: { text: 'Sicherheitsbann' }
            })


            await message.member!.send({ embeds: [embed], components: [unbanRequestButton] })
            .catch(err => {
                console.log(err)
            })
        }
    }
})