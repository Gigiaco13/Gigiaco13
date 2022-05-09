const mongoose = require('mongoose')

const modelo = mongoose.Schema({
    titulo: String,
    texto: String,
    enviado: { type: Date, default: Date.now }
})

const mygrid = mongoose.model('mygrid', modelo)

module.exports = mygrid