import { Schema, model, models } from "mongoose";

const Bumps = new Schema({
    userId: String,
    bumps: {type: Number, default: 0}
})
const BumpModel = models['bumps'] || model('bumps', Bumps)
export default BumpModel