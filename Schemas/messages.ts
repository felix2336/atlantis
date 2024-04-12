import { Schema, model } from 'mongoose'

let Messages = new Schema({
    user: String,
    messagesSent: {
        monday: Number,
        tuesday: Number,
        wednesday: Number,
        thursday: Number,
        friday: Number,
        saturday: Number,
        sunday: Number
    },
    total: Number
})

export default model('Messages', Messages)