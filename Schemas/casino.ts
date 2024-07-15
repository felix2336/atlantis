import mongoose, { Schema, model } from 'mongoose'

let Casino = new Schema({
    user: String,
    wallet: Number,
    bank: Number,
    inventory: {}
})

const CasinoModel = mongoose.models['casino'] || model('casino', Casino)

export default CasinoModel