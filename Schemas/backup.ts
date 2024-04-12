import { Schema, model } from 'mongoose'

let backup = new Schema({
    categories: {},
    roles: {}
})

export default model('backup', backup)