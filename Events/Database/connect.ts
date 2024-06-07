import mongoose from 'mongoose'
import cfg from '../../System/config.json'
import { ConsoleInfo } from '../../contents'

export default {
    name: 'ready',
    once: true,

    async execute() {
        await mongoose.connect(cfg.mongourl)
            .then(() => new ConsoleInfo().show(`Datenbankverbindung hergestellt`))
            .catch(err => console.error(err))
    }
}