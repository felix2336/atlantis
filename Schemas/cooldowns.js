const { Schema, model } = require('mongoose')

let cooldowns = new Schema({
    user: String,
    work: String,
    crime: String,
    rob: String,
    daily: String
})

module.exports = model('cooldowns', cooldowns)