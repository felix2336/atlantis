import mongoose, { Schema, model } from "mongoose";

const Bumps = new Schema({
    userId: String,
    bumps: {type: Number, default: 0}
})
const BumpModel = mongoose.models['bumps'] || model('bumps', Bumps)
export default BumpModel