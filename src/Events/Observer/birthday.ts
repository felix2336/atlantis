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
            const { day, month } = DateTime.now();
            const birthdays = await Birthdays.find({ day, month });
            if (!birthdays.length) return;

            const users = birthdays.map(b => `<@${b.userId}>`);
            const embed = new EmbedBuilder({
                title: '🎉 Herzlichen Glückwunsch 🎉',
                description: `${formatUsers(users)} ${users.length > 1 ? 'haben' : 'hat'} heute Geburtstag! 🥳🎂`,
                fields: [
                    { name: '🎁 Alles Gute!', value: `Wir wünschen ${users.length > 1 ? 'euch' : 'dir'} einen tollen Tag voller Freude und Überraschungen!` },
                    { name: '🎈 Feiert schön!', value: `Genießt ${users.length > 1 ? 'jeden' : 'jeden'} Augenblick dieses Tages und lasst ${users.length > 1 ? 'dich' : 'dich'} gebührend feiern!` }
                ]
            });

            await channel.send({ embeds: [embed] })
                .then(async msg => await msg.react('🥳'));
        });
    },
});

function formatUsers(users: string[]): string {
    if (users.length === 2) return users.join(' und ');
    const lastUser = users.pop();
    return users.join(', ') + ' und ' + lastUser;
}