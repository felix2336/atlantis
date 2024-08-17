import mongoose, { Schema, model } from 'mongoose'

let cooldowns = new Schema({
    user: String,
    work: String,
    crime: String,
    rob: String,
    daily: String
})

const CooldownModel = mongoose.models['cooldowns'] || model('cooldowns', cooldowns)

export default CooldownModel