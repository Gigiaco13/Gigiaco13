const multer = require('multer')
const fs = require('fs')

module.exports = (app)=>{

    //importar o config database
    var database = require('../config/database')
    //importar o model gallery
    var gallery = require('../models/gallery')

    //exibir o formulario gallery.ejs
    app.get('/gallery',async(req,res)=>{
        //conectar com o database
        database()
        //executar a busca de documentos da coleção gallery
        var documentos = await gallery.find()
        res.render('gallery.ejs',{dados:documentos})
    })

    //importar a config do multer
    var upload = require('../config/multer')
    //upload do arquivo
    app.post('/gallery',(req,res)=>{
        //upload das imagens
        upload(req,res,async (err)=>{
            if(err instanceof multer.MulterError){
                res.send("O arquivo é maior que 100kb")
            }else if(err){
                res.send('Tipo de Arquivo inválido')
            }else{
                //conectar ao database
                database()
                //gravar o nome do arquivo na coleção gallery
                var documento = await new gallery({
                arquivo:req.file.filename
                }).save()
                res.redirect('/gallery')

            }
        })
    })
    app.get('/alterar_gallery',async(req,res)=>{
        var id = req.query.id
        var busca = await gallery.findOne({_id:id})
        res.render('gallery_alterar.ejs',{dados:busca})
    })
    app.post('/alterar_gallery',(req,res)=>{
        //upload das imagens
        upload(req,res,async (err)=>{
            try {
                fs.unlinkSync("uploads/"+req.body.anterior)
            } catch (error) {
                if(err instanceof multer.MulterError){
                    res.send("O arquivo é maior que 100kb")
                }else if(err){
                    res.send('Tipo de Arquivo inválido')
                }else{
                    //conectar ao database
                    database()
                    try {
                        fs.unlinkSync("uploads/"+req.body.anterior)
                    } catch (error) {
                        
                    }
                    //gravar o nome do arquivo na coleção gallery
                    var documento = await gallery.findOneAndUpdate({_id:req.query.id},{arquivo:req.file.filename})
                    
                    res.redirect('/gallery')
    
                } 
            }
            if(err instanceof multer.MulterError){
                res.send("O arquivo é maior que 100kb")
            }else if(err){
                res.send('Tipo de Arquivo inválido')
            }else{
                //conectar ao database
                database()
                try {
                    fs.unlinkSync("uploads/"+req.body.anterior)
                } catch (error) {
                    
                }
                //gravar o nome do arquivo na coleção gallery
                var documento = await gallery.findOneAndUpdate({_id:req.query.id},{arquivo:req.file.filename})
                
                res.redirect('/gallery')

            } 
        })
    })
    app.get('/excluir_gallery',async(req,res)=>{
        var id = req.query.id
        var busca = await gallery.findOne({_id:id})
        res.render('gallery_excluir.ejs',{dados:busca})
    })
    app.post("/excluir_gallery", async(req,res)=>{
        var id= req.query.id
        try {
            fs.unlinkSync("uploads/"+req.body.anterior)
        } catch (error) {
            
        }
        var alterar = await gallery.findOneAndRemove({_id:id})
        res.redirect("/gallery") 
    })

}
