const { Schema, model } = require('mongoose')

let Casino = new Schema({
    user: String,
    wallet: Number,
    bank: Number,
    inventory: {}
})

module.exports = model('casino', Casino)