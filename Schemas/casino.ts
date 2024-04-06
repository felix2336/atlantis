import { Schema, model } from 'mongoose'

let Casino = new Schema({
    user: String,
    wallet: Number,
    bank: Number,
    inventory: {}
})

export default model('casino', Casino)