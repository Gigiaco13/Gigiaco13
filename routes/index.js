module.exports = (app) => {

    var conexao = require('../config/database')


    app.get('/', async(req, res) => {
        conexao()
        var mygrid = require('../models/mygrid')
        var gallery = require('../models/gallery')
        var documentos = await mygrid.find().limit(3).sort({'_id':-1})
        var imagens = await gallery.find().limit(6).sort({'_id':-1})

        res.render('index.ejs',{dados:documentos,img:imagens})
    })

    app.post('/', (req, res) => {
        
    conexao()
    var modelo = require('../models/mensagem')

        var documento = new modelo({
                nome: req.body.first_name,
                sobrenome: req.body.last_name,
                email: req.body.email,
                mensagem: req.body.message
            })
            .save()
            .then(() => {
                res.redirect('/')
            })
            .catch(() => {
                res.send("Não foi possível gravar o documento no Banco de Dados")
            })
    })
}