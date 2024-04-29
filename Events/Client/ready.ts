import { Client, ActivityType } from 'discord.js'
import { ConsoleInfo } from '../../contents'

export default {
    name: 'ready',
    once: true,

    async execute(client: Client){
        new ConsoleInfo().show(`Bot online als ${client.user!.tag}`)
        client.user!.setActivity({type: ActivityType.Competing, name: 'Atlantis Lounge'})
    }
}