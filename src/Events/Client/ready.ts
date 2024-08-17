import { Event } from 'dcbot'
import { Client, ActivityType } from 'discord.js'

export default new Event({
    name: 'ready',
    once: true,

    async execute(client: Client){
        client.user!.setActivity({type: ActivityType.Competing, name: 'Atlantis Lounge'})
    }
})