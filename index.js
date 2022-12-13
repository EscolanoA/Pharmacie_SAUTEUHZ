/**
 * @Auteur Brieuc Meyer
 * @Version 1.0.0
 * @Crédits : Roumanet David => utilisation de dotenv pour utiliser des variables d'environnent : http://david.roumanet.free.fr/BTS-SIO/Bloc3-Dev/B3-DEV%20-%20300%20exploration%20s%C3%A9curisation%20NodeJS.pdf
 *                              tès utiles pour des gestions de rôles par ex 
*/
const express = require('express')
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
const Routeur = require('./routes/routes.js')
const dotenv = require('dotenv')


let app = express()
//liens vers les dossiers de travail
app.set('view engine', 'ejs')
app.use(express.static('assets'))
app.use(express.static('views'))

dotenv.config()
app.use(express.urlencoded())
app.use(cookieParser())
//config du middleware express-sessions
app.use(sessions({
    secret: process.env.TOKEN_SECRET,
    saveUninitialized:true,
    resave: false
}));


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


const port = 3000

https.createServer(options, app).listen(port, () => {
 console.log(`server démarré     en HTTPS. Go to https://localhost:${port}`);
 }); 


app.get('/', (req, res) => {
    res.send('Serveur de la Pharmacie Sauteuhz est actif')
})

//gerer 404
Routeur.use((req, res) => {
    res.status(404).redirect('accueil')
});

//commande pour lancer :
//npx nodemon index.js

//lien de test : https://localhost:3000/accueil
