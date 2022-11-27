const express = require('express');
const routeur = express.Router();

const connexionController = require('../controllers/ctrlConnexion')
const accueilController = require('../controllers/ctrlAccueil')


const ctrlPatients = require('../controllers/ctrlPatients')

const ctrlOrdonnances = require('../controllers/ctrlOrdonnances')

const ctrlPosologies = require('../controllers/ctrlPosologies')

const ctrlMedicaments = require('../controllers/ctrlMedicaments')

const ctrlMutuelles = require('../controllers/ctrlMutuelles')

const ctrlMedecins = require('../controllers/ctrlMedecins')

const ctrlPathologies = require('../controllers/ctrlPathologies')

//Page d'indentification
routeur.get('/connexion', connexionController.afficherConnexion)



//La Page d'aceuil
routeur.get('/accueil', accueilController.afficherAcceuil)



//Routes pour la page mutuelles
routeur.get('/mutuelles', ctrlMutuelles.afficherMutuelles)
routeur.post('/mutuelles/ajouter', ctrlMutuelles.ajouterMutuelle)
routeur.get('/mutuelles/supprimer/:id', ctrlMutuelles.supprimerMututelle)

//Routes pour la sous page mutuelles/modifier
routeur.get('/mutuelles/modifier/:id', ctrlMutuelles.afficherModifMutuelle)
routeur.post('/mutuelles/modifier', ctrlMutuelles.modifMututelle)



//Routes pour la page medecins
routeur.get('/medecins', ctrlMedecins.afficherMedecins)
routeur.post('/medecins/ajouter', ctrlMedecins.ajouterMedecin)
routeur.get('/medecins/supprimer/:id', ctrlMedecins.supprimerMedecin)

//Routes pour la sous page medecins/modifier
routeur.get('/medecins/modifier/:id', ctrlMedecins.afficherModifMedecin)
routeur.post('/medecins/modifier', ctrlMedecins.modifMedecin)


//Routes pour la page pathologies
routeur.get('/pathologies', ctrlPathologies.afficherPathologies)
routeur.post('/pathologies/ajouter', ctrlPathologies.ajouterPathologie)
routeur.get('/pathologies/supprimer/:id', ctrlPathologies.supprimerPathologie)

//Routes pour la sous page pathologies/modifier
routeur.get('/pathologies/modifier/:id', ctrlPathologies.afficherModifPathologie)
routeur.post('/pathologies/modifier', ctrlPathologies.modifPathologie)




//Routes pour la page medicaments
routeur.get('/medicaments', ctrlMedicaments.afficherMedicaments)
routeur.post('/medicaments/ajouter', ctrlMedicaments.ajouterMedicament)
routeur.get('/medicaments/supprimer/:id', ctrlMedicaments.supprimerMedicament)

//Routes pour la sous page medicaments/modifier
routeur.get('/medicaments/modifier/:id', ctrlMedicaments.afficherModifMedicament)
routeur.post('/medicaments/modifier', ctrlMedicaments.modifMedicament)




//Routes pour la page Patient
routeur.get('/patients', ctrlPatients.afficherPatients)
routeur.post('/patients/ajouter', ctrlPatients.ajouterPatient)
routeur.get('/patients/supprimer/:numsecu', ctrlPatients.supprimerPatient)

//Routes pour la sous page patients/modifier
routeur.get('/patients/modifier/:numsecu/:idmut', ctrlPatients.afficherModifPatient)
routeur.post('/patients/modifier', ctrlPatients.modifPatient)

//Routes pour la sous page patients/ordonnances
routeur.get('/patients/ordonnances/:numsecu', ctrlOrdonnances.afficherOrdonnances)
routeur.post('/patients/ordonnances/ajouter', ctrlOrdonnances.ajouterOrdonnance)
routeur.get('/patients/ordonnances/supprimer/:numsecu/:id', ctrlOrdonnances.supprimerOrdonnance)


//Routes pour la sous page patients/posologies
routeur.get('/patients/ordonnances/posologies/:idordo', ctrlPosologies.afficherPosologies)

//routeur.get('/patients/ordonnances/posologies/modifPosologies', modifPosologiesController.afficherModifPosologie)
//routeur.get('/patients/ordonnances/modifOrdonnances', modifOrdonnancesController.afficherModifOrdonnances)
//routeur.get('/patients/ordonnances/modifMedecin', modifMedecinController.afficherModifMedecin)




module.exports = routeur;