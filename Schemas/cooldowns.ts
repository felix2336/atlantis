import { Schema, model } from 'mongoose'

let cooldowns = new Schema({
    user: String,
    work: String,
    crime: String,
    rob: String,
    daily: String
})

export default model('cooldowns', cooldowns)