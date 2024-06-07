import { Schema, model } from "mongoose";

const Bumps = new Schema({
    userId: String,
    bumps: Number
})
const BumpModel = model('bumps', Bumps)
export default BumpModel