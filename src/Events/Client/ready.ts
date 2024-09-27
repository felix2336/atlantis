import { Event } from 'dcbot'
import fs from 'fs'
import { Client, ActivityType } from 'discord.js'

/**
 * Ereignis, das ausgelöst wird, wenn der Bot bereit ist.
 */
export default new Event({
    /**
     * Name des Ereignisses.
     */
    name: 'ready',
    /**
     * Ob das Ereignis nur einmal ausgelöst werden soll.
     */
    once: true,

    /**
     * Funktion, die ausgeführt wird, wenn das Ereignis ausgelöst wird.
     * @param {Client} client Der Discord-Client.
     */
    async execute(client) {
        // Setze die Aktivität des Bot-Benutzers auf "Gaming Universe".
        client.user!.setActivity({ type: ActivityType.Competing, name: 'Gaming Universe' })
        // Lade alle Mitglieder des Servers mit der ID '1146113684435898439'.
        await client.guilds.cache.get('1146113684435898439')!.members.fetch()
    }
})
