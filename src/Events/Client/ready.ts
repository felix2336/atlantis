import { Event } from 'dcbot'
import { Client, ActivityType } from 'discord.js'

export default new Event({
    name: 'ready',
    once: true,

    async execute(client){
        client.user!.setActivity({type: ActivityType.Competing, name: 'Atlantis Lounge'})
        await client.guilds.cache.get('1146113684435898439')!.members.fetch()
    }
})