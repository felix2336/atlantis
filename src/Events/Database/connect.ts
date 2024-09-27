import mongoose from 'mongoose'
import cfg from '../../System/config.json'
import { MyClient } from 'contents'
import { Event } from 'dcbot'

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
     * @param {MyClient} client Der Client, der das Ereignis ausgelöst hat.
     */
    async execute(client: MyClient) {
        /**
         * Verbindung zur Datenbank herstellen.
         */
        await mongoose.connect(cfg.mongourl)
            .then(() => client.logger.info('Verbunden mit der Datenbank'))
            .catch(err => console.error(err))
    }
})
