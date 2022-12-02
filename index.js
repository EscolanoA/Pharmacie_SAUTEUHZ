const express = require('express')
const ejs = require('ejs')
const sessions = require('express-session');
const iniparser = require('iniparser')
const Routeur = require('./routes/routes.js')


let app = express()
app.set('view engine', 'ejs')
app.use(express.static('assets'))
app.use(express.static('views'))
app.use(express.static('img'))
app.use(express.static('controllers'));



app.use(express.urlencoded())

app.use(sessions({
    secret: "secret",
    saveUninitialized:true,
    resave: false
}));

//priorité des routes 
app.use('/', Routeur)

app.listen(3000, () => console.log('Serveur de la Pharmacie Sauteuhz est actif'))
app.get('/', (req, res) => {
    res.send('Serveur de la Pharmacie Sauteuhz est actif')
})

