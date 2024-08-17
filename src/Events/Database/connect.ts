import mongoose from 'mongoose'
import cfg from '../../System/config.json'
import { MyClient } from '../../contents'
import { Event } from 'dcbot'

export default new Event({
    name: 'ready',
    once: true,

    async execute(client: MyClient) {
        await mongoose.connect(cfg.mongourl)
            .then(() => client.info('Connected to Database'))
            .catch(err => console.error(err))
    }
})