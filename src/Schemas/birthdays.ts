import mongoose, {Schema, model} from 'mongoose'

const BirthdaysSchema = new Schema({
    userId: {type: String, required: true},
    day: {type: Number, required: true},
    month: {type: Number, required: true},
})

const Birthdays = model('birthdays', BirthdaysSchema)

export default Birthdays