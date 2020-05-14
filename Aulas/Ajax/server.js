const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(express.static('.')); // fornece todos arquivos stativos
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // todo arquivo que receber fazer o parser...

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null,'./upload');
    },
    filename: function(req,file,callback){
        callback(null,`${Date.now()}_${file.originalname}`);
    }
});

const upload = multer ({storage}).single('arquivo');

app.post('/upload',(req,res)=>{
    upload(req, res, err =>{
        if(err){
            return res.end('Ocorreu um Erro.')
        }

        res.end('Concluido com Sucesso.');
    });
});

app.get('/teste',(req, res) => res.send('OK'));
app.listen(8080, () => console.log('[RUN SERVER] - Executing...'));