const mongoose = require('mongoose')

const modelo = mongoose.Schema({
    arquivo: String,
    enviado: { type: Date, default: Date.now }
})

const gallery = mongoose.model('gallery', modelo)

module.exports = gallery