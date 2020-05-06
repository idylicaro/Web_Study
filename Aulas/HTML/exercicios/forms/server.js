const expresss = require('express');
const app = expresss();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.post('/usuarios', (req, resp) =>{
    console.log(req.body);
    resp.send("Parabens!");
})

app.listen(3003);