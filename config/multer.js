//importar o pacote multer
const multer = require('multer')
//configurar o armazenamento
const armazenamento = multer.diskStorage(
    {
        //pasta de destino
        destination:(req,file,cb)=>{
            cb(null,'./uploads/')
        },
        //nome do arquivo
        filename:(req,file,cb)=>{
            cb(null,Date.now()+file.originalname)
        }
    }
)
const giovani = 100000

var upload = multer({
    storage: armazenamento,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"||
            file.mimetype == "image/webp"
        ) {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error("Tipo de arquivo inválido"))
        }
    },
    limits: { fileSize: giovani }

}).single("imagem")    

module.exports = upload