import mongoose from 'mongoose'
import cfg from '../../System/config.json'

export default {
    name: 'ready',
    once: true,

    async execute(){
        await mongoose.connect(cfg.mongourl)
        .then(() => console.log('Connected to Database'))
        .catch(err => console.error(err))
    }
}