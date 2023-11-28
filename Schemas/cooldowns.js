const { Schema, model } = require('mongoose')

let cooldowns = new Schema({
    user: String,
    work: Number,
    crime: Number,
    rob: Number,
    daily: Number
})

module.exports = model('cooldowns', cooldowns)