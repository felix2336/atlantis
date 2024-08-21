import mongoose, { Schema, model } from 'mongoose'

const MessageSchema = new Schema({
    userId: { type: String, required: true },
    totalMessages: { type: Number, default: 0 },
    dailyMessages: {
        type: Object,
        default: {
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0,
            sunday: 0
        }
    }
})

const MessageModel = mongoose.models['messages'] || model('messages', MessageSchema)
export default MessageModel