const mongoose = require('mongoose')
const cfg = require('../../System/config.json')

module.exports = {
    name: 'ready',
    once: true,

    async execute(){
        await mongoose.connect(cfg.mongourl)
        .then(() => console.log('Connected to Database'))
        .catch(err => console.error(err))
    }
}