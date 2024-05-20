import { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, TextChannel } from 'discord.js'
import { Giveaway, Channels, MyClient } from "../../contents";
import { readFileSync, writeFileSync } from 'fs'

export default {
    name: Events.ClientReady,

    async execute(client: MyClient) {
        const channel = client.channels.cache.get(Channels.test) as TextChannel
        async function check() {
            const now = Date.now()
            let giveaways = JSON.parse(readFileSync('./JSON/giveaways.json', 'utf8')) as Giveaway[]

            for(const giveaway of giveaways) {
                if(now > giveaway.endTime) {
                    const winner = giveaway.participants[Math.floor(Math.random() * giveaway.participants.length)]
                    const message = await channel.messages.fetch(giveaway.messageId)
                    const embed = EmbedBuilder.from(message.embeds[0])
                    embed.data.fields![1].name = 'Gewinner'
                    embed.data.fields![1].value = `<@${winner}>`

                    await message.edit({embeds: [embed], components: []})
                    await message.reply({content: `🎉 **»** Herzlichen Glückwunsch <@${winner}>! Du hast **${giveaway.prize}** gewonnen!`})

                    giveaways = giveaways.filter(g => g.messageId != giveaway.messageId)
                    writeFileSync('./JSON/giveaways.json', JSON.stringify(giveaways, null, 2), 'utf8')
                }
            }
        }
        await check()
        setInterval(check, 60000)
    }
}