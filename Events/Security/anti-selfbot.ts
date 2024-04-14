import { Events, Message } from 'discord.js'
import { Roles } from '../../config'

export default {
    name: Events.MessageCreate,

    async execute(message: Message) {
        if(message.author.bot) return;
        if(message.member?.roles.cache.has(Roles.staff)) return;
        const { content } = message
        if(!message.member?.roles.cache.has(Roles.staff) && content.includes('@everyone') && content.includes('discord.gg/')){
            await message.delete()
            await message.member?.ban({deleteMessageSeconds: 3600, reason: "Sent discord invite and pinged everyone"}).catch(async err => {
                await message.member?.timeout(3600, 'Sent discord invite and pinged everyone')
            })
        }
    }
}