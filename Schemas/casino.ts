import { Schema, model, models } from 'mongoose'

let Casino = new Schema({
    user: String,
    wallet: Number,
    bank: Number,
    inventory: {}
})

const CasinoModel = models['casino'] || model('casino', Casino)

export default CasinoModel