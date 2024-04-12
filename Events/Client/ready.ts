import { Client, ActivityType } from 'discord.js'

export default {
    name: 'ready',
    once: true,

    async execute(client: Client){
        console.log(`Logged in as ${client.user!.username}`)
        client.user!.setActivity({type: ActivityType.Competing, name: 'Atlantis Lounge'})
    }
}