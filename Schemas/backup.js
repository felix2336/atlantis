const { Schema, model } = require('mongoose')

let backup = new Schema({
    categories: {},
    roles: {}
})

module.exports = model('backup', backup)