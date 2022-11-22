const express = require('express');
const routeur = express.Router();
const identificationController = require('../controllers/ctrlIdentification')

routeur.get('/identification', identificationController.afficherIdentification)

module.exports = routeur;