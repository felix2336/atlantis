import { Message, Client, Events, DMChannel, ChannelType } from 'discord.js';
import DB from '../../Schemas/messages';

export default {
    name: Events.MessageCreate,

    async execute(message: Message, client: Client) {
        if (message.author.bot) return;
        if (message.channel.type == ChannelType.DM) return;
        if (!message.member!.roles.cache.has('1156298949301379212')) return;
        if (message.channel.parentId == '1156996872657977394') return;
        if (message.channel.parentId == '1180678820085370940') return;

        let User = await DB.findOne({ user: message.author.id })
        if (!User) {
            User = await DB.create({
                user: message.author.id,
                messagesSent: {
                    monday: 0,
                    tuesday: 0,
                    wednesday: 0,
                    thursday: 0,
                    friday: 0,
                    saturday: 0,
                    sunday: 0
                },
                total: 0
            })
        }
        const day = new Date().getDay()
        //@ts-ignore
        User.messagesSent[getDay(day)]++;
        //@ts-ignore
        User.total++;
        await User.save();
    }
}

function getDay(dayNumber: number) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[dayNumber];
}