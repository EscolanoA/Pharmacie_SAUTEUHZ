const express = require('express')
const ejs = require('ejs')
var cookieParser = require('cookie-parser');
const sessions = require('express-session');
const iniparser = require('iniparser')
const Routeur = require('./routes/routes.js')

//require les file systems, crées avec la commende linux du git bash : 
//openssl req -nodes -new -x509 -keyout server.key -out server.cert

const fs = require('fs')
const https = require('https')
const path = require('path')

const key = fs.readFileSync(path.join(__dirname, 'certificate', 'server.key'));
const cert = fs.readFileSync(path.join(__dirname, 'certificate', 'server.cert'));
const options = { key, cert };




let app = express()
app.set('view engine', 'ejs')
app.use(express.static('assets'))
app.use(express.static('views'))
app.use(express.static('img'))
app.use(express.static('controllers'));



app.use(express.urlencoded())
app.use(cookieParser());
app.use(sessions({
    secret: "secret",
    saveUninitialized:true,
    resave: false
}));

//priorité des routes 
app.use('/', Routeur)

//app.listen(3000, () => console.log('Serveur de la Pharmacie Sauteuhz est actif'))

let port = 3000

https.createServer(options, app).listen(port, () => {
 console.log(`server running HTTPS. Go to https://localhost:${port}`);
 }); 


app.get('/', (req, res) => {
    res.send('Serveur de la Pharmacie Sauteuhz est actif')
})

//commande pour lancer :
//npx nodemon index.js
//ou npm run nodemon 
//car script dans package.json

//lien de test : https://localhost:3000/accueil
