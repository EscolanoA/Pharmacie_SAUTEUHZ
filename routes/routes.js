const express = require('express');
const routeur = express.Router();


//relatives paths to 
const ctrlConnexion = require('../controllers/ctrlConnexion')

const ctrlAccueil = require('../controllers/ctrlAccueil')


const ctrlPatients = require('../controllers/ctrlPatients')

const ctrlOrdonnances = require('../controllers/ctrlOrdonnances')

const ctrlPosologies = require('../controllers/ctrlPosologies')

const ctrlMedicaments = require('../controllers/ctrlMedicaments')

const ctrlMutuelles = require('../controllers/ctrlMutuelles')

const ctrlMedecins = require('../controllers/ctrlMedecins')

const ctrlPathologies = require('../controllers/ctrlPathologies')




//Page d'indentification
routeur.get('/', ctrlConnexion.afficherConnexion)
routeur.post('/connexion', ctrlConnexion.testConnexion)



//Toutes les routes dessous sont sécurisés par un middlware qui renvoie next() si l'user est euthentifié / à une session
//La Page d'aceuil
routeur.get('/accueil',ctrlConnexion.testAuthentification, ctrlAccueil.afficherAcceuil)



//Routes pour la page mutuelles
routeur.get('/mutuelles', ctrlConnexion.testAuthentification, ctrlMutuelles.afficherMutuelles)
routeur.post('/mutuelles/ajouter', ctrlConnexion.testAuthentification, ctrlMutuelles.ajouterMutuelle)
routeur.get('/mutuelles/supprimer/:id', ctrlConnexion.testAuthentification, ctrlMutuelles.supprimerMututelle)

//Routes pour la sous page mutuelles/modifier
routeur.get('/mutuelles/modifier/:id', ctrlConnexion.testAuthentification, ctrlMutuelles.afficherModifMutuelle)
routeur.post('/mutuelles/modifier', ctrlConnexion.testAuthentification, ctrlMutuelles.modifMututelle)



//Routes pour la page medecins
routeur.get('/medecins', ctrlConnexion.testAuthentification, ctrlMedecins.afficherMedecins)
routeur.post('/medecins/ajouter', ctrlConnexion.testAuthentification, ctrlMedecins.ajouterMedecin)
routeur.get('/medecins/supprimer/:id', ctrlConnexion.testAuthentification, ctrlMedecins.supprimerMedecin)

//Routes pour la sous page medecins/modifier
routeur.get('/medecins/modifier/:id', ctrlConnexion.testAuthentification, ctrlMedecins.afficherModifMedecin)
routeur.post('/medecins/modifier', ctrlConnexion.testAuthentification, ctrlMedecins.modifMedecin)


//Routes pour la page pathologies
routeur.get('/pathologies', ctrlConnexion.testAuthentification, ctrlPathologies.afficherPathologies)
routeur.post('/pathologies/ajouter', ctrlConnexion.testAuthentification, ctrlPathologies.ajouterPathologie)
routeur.get('/pathologies/supprimer/:id', ctrlConnexion.testAuthentification, ctrlPathologies.supprimerPathologie)

//Routes pour la sous page pathologies/modifier
routeur.get('/pathologies/modifier/:id', ctrlConnexion.testAuthentification, ctrlPathologies.afficherModifPathologie)
routeur.post('/pathologies/modifier', ctrlConnexion.testAuthentification, ctrlPathologies.modifPathologie)




//Routes pour la page medicaments
routeur.get('/medicaments', ctrlConnexion.testAuthentification, ctrlMedicaments.afficherMedicaments)
routeur.post('/medicaments/ajouter', ctrlConnexion.testAuthentification, ctrlMedicaments.ajouterMedicament)
routeur.get('/medicaments/supprimer/:id', ctrlConnexion.testAuthentification, ctrlMedicaments.supprimerMedicament)

//Routes pour la sous page medicaments/modifier
routeur.get('/medicaments/modifier/:id', ctrlConnexion.testAuthentification, ctrlMedicaments.afficherModifMedicament)
routeur.post('/medicaments/modifier', ctrlConnexion.testAuthentification, ctrlMedicaments.modifMedicament)




//Routes pour la page Patient
routeur.get('/patients', ctrlConnexion.testAuthentification, ctrlPatients.afficherPatients)
routeur.post('/patients/ajouter', ctrlConnexion.testAuthentification, ctrlPatients.ajouterPatient)
routeur.get('/patients/supprimer/:numsecu', ctrlConnexion.testAuthentification, ctrlPatients.supprimerPatient)

//Routes pour la sous page patients/modifier
routeur.get('/patients/modifier/:numsecu/:idmut', ctrlConnexion.testAuthentification, ctrlPatients.afficherModifPatient)
routeur.post('/patients/modifier', ctrlConnexion.testAuthentification, ctrlPatients.modifPatient)

//Routes pour la sous sous page patients/ordonnances/posologies
routeur.get('/patients/ordonnances/:numsecu/posologies/:idordo', ctrlConnexion.testAuthentification, ctrlPosologies.afficherPosologies)

//formalisme d'écritures des routes :
routeur.get('/patients/:numsecu/ordonnances/:idordo/posologies/:idpos/supprimer', ctrlConnexion.testAuthentification, ctrlPosologies.supprimerPosologie)

routeur.post('/patients/ordonnances/posologies/ajouter', ctrlConnexion.testAuthentification, ctrlPosologies.ajouterPosologie)

routeur.get('/patients/:numsecu/ordonnances/:idordo/posologies/:idpos/modifier', ctrlConnexion.testAuthentification, ctrlPosologies.afficherModifPosologie)
routeur.post('/patients/ordonnances/posologies/modifier', ctrlConnexion.testAuthentification, ctrlPosologies.modifPosologie)





//Routes pour la sous page patients/ordonnances
routeur.get('/patients/ordonnances/:numsecu', ctrlConnexion.testAuthentification, ctrlOrdonnances.afficherOrdonnances)
routeur.post('/patients/ordonnances/ajouter', ctrlConnexion.testAuthentification, ctrlOrdonnances.ajouterOrdonnance)
routeur.get('/patients/ordonnances/:numsecu/supprimer/:idordo', ctrlConnexion.testAuthentification, ctrlOrdonnances.supprimerOrdonnance)
routeur.get('/patients/ordonnances/modifier/:idordo', ctrlConnexion.testAuthentification, ctrlOrdonnances.afficherModifOrdonnance)
routeur.post('/patients/ordonnances/modifier', ctrlConnexion.testAuthentification, ctrlOrdonnances.modifOrdonnance)






module.exports = routeur;