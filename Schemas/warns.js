const { Schema, model } = require('mongoose');

let warns = new Schema({
    user: String,
    warns: Array
})

module.exports = model("warns", warns)