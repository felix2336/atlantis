const { Schema, model } = require('mongoose')

const casino = new Schema({
    user: String,
    wallet: Number,
    bank: Number,
    inventory: Object
})