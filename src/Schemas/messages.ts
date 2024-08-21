import mongoose, { Schema, model } from 'mongoose'

const MessageSchema = new Schema({
    userId: { type: String, required: true },
    messagesSent: { type: Number, default: 0 },
})

const MessageModel = model('messages', MessageSchema)
export default MessageModel