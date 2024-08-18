import { Event } from 'dcbot'
import Croner from 'croner'
import { DateTime } from 'luxon'
import Birthdays from '../../Schemas/birthdays'
import { EmbedBuilder, TextChannel } from 'discord.js'
import { Channels } from 'contents'

export default new Event({
    name: 'ready',

    async execute(client) {
        const channel = client.channels.cache.get(Channels.birthdays) as TextChannel

        new Croner('0 8 * * *', async () => {
            const day = DateTime.now().day
            const month = DateTime.now().month
            const birthdays = await Birthdays.find({day: day, month: month})
            if(birthdays.length < 1) return;

            if(birthdays.length > 1) {
                const users = birthdays.map(b => `<@${b.userId}>`)
                const embed = new EmbedBuilder({
                    title: '🎉 Herzlichen Glückwunsch 🎉',
                    description: `${formatUsers(users)} haben heute Geburtstag! 🥳🎂`,
                    fields: [
                        {name: '🎁 Alles Gute!', value: 'Wir wünschen euch einen tollen Tag voller Freude und Überraschungen!'},
                        {name: '🎈 Feiert schön!', value: 'Genießt jeden Augenblick dieses Tages und lasst dich gebührend feiern!'}
                    ]
                })

                await channel.send({embeds: [embed]})
                    .then(async msg => await msg.react('🥳'))
                return;
            } else if(birthdays.length == 1) {
                const embed = new EmbedBuilder({
                    title: '🎉 Herzlichen Glückwunsch 🎉',
                    description: `<@${birthdays[0].userId}> hat heute Geburtstag! 🥳🎂`,
                    fields: [
                        { name: '🎁 Alles Gute!', value: 'Wir wünschen dir einen tollen Tag voller Freude und Überraschungen!' },
                        { name: '🎈 Feiere schön!', value: 'Genieße jeden Augenblick dieses Tages und lass dich gebührend feiern!' }
                    ]
                })

                await channel.send({embeds: [embed]})
                    .then(async msg => await msg.react('🥳'))
            }
        })
    },
})

function formatUsers(users: string[]): string {
    if(users.length == 2) return users.join(' und ');

    const lastUser = users.pop()
    return users.join(', ') + ' und ' + lastUser
}