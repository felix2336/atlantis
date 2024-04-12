import { Events, Message } from 'discord.js'
import { Roles } from '../../config'

export default {
    name: Events.MessageCreate,

    async execute(message: Message) {
        const { member, content } = message
        if(!member!.roles.cache.has(Roles.staff) && content.includes('@everyone') && content.includes('discord.gg/')){
            await message.delete()
            await member!.ban({deleteMessageSeconds: 3600, reason: "Sent discord invite and pinged everyone"}).catch(async err => {
                await member?.timeout(3600, 'Sent discord invite and pinged everyone')
            })
        }
    }
}