const express = require('express')
var cookieParser = require('cookie-parser');
const sessions = require('express-session');

const cors = require('cors') // Cross Origin Resource Sharing
const morgan = require('morgan') // logs pour authentification par token

const Routeur = require('./routes/routes.js')
const routeur = require('./routes/routes.js')
//const loginRoutes = require('./routes/loginRoutes')






let app = express()
app.set('view engine', 'ejs')
app.use(express.static('assets'))
app.use(express.static('views'))
app.use(express.static('img'))

//app.use(express.static('controllers'));



app.use(express.urlencoded())
app.use(cookieParser());
app.use(sessions({
    secret: "secret",
    saveUninitialized:true,
    resave: false
}));

// Utilisation des midlewares pour l'authentification JWT à faire
//app.use(cors())
//app.use(morgan('tiny'))

app.use('/', Routeur)



//require les file systems, crées avec la commende linux du git bash : 
//openssl req -nodes -new -x509 -keyout server.key -out server.cert
const fs = require('fs')

//créer un serveur HTTPS 
const https = require('https')
const path = require('path')
//donner le chemin vers les certificats autos-signés
const key = fs.readFileSync(path.join(__dirname, 'certificates', 'server.key'));
const cert = fs.readFileSync(path.join(__dirname, 'certificates', 'server.cert'));
const options = { key, cert };


let port = 3000

https.createServer(options, app).listen(port, () => {
 console.log(`server démarré     en HTTPS. Go to https://localhost:${port}`);
 }); 


app.get('/', (req, res) => {
    res.send('Serveur de la Pharmacie Sauteuhz est actif')
})

routeur.use((req, res) => {
    res.status(404).redirect('accueil')
});

//commande pour lancer :
//npx nodemon index.js

//lien de test : https://localhost:3000/accueil
