import { Guild, ChannelType } from "discord.js";
import { writeFileSync } from 'fs'
export class Backup {
    categories?: any;

    constructor(data?: Backup) {
        this.categories = data?.categories
    }

    public save(guild: Guild) {
        const categories: any = {}
        guild.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).forEach(category => {
            categories[category.name] = {};

            guild.channels.cache.filter(channel => channel.parentId === category.id).forEach(channel => {
                categories[category.name][channel.name] = channel.type;
            });
        });
        this.categories = categories
        writeFileSync('./JSON/backup.json', JSON.stringify(this, null, 2), 'utf8')
    }

    public async load(guild: Guild) {
        for (const category in this.categories) {
            const cat = await guild.channels.create({
                name: category,
                type: ChannelType.GuildCategory,
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone,
                        deny: ['ViewChannel']
                    }
                ]
            })

            const channelData = this.categories[category]
            for (const channel in channelData) {
                const channelType = channelData[channel]

                await guild.channels.create({
                    name: channel,
                    type: channelType,
                    parent: cat
                })
            }
        }
    }
}