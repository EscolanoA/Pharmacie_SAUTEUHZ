const express = require('express');
const routeur = express.Router();
const connexionController = require('../controllers/ctrlConnexion')

routeur.get('/connexion', connexionController.afficherConnexion)

module.exports = routeur;