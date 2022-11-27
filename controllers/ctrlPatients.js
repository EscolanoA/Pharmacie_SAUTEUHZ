//importer les models d'accès aux donnés (requetes SQL)
const modelPatients = require('../models/modelPatients.js')
const modelMutuelles = require('../models/modelMutuelles.js')



module.exports = {



    async afficherPatients(req, res) {

        try {
            let data = await modelPatients.modelAfficherPatients()
            let data2 = await modelMutuelles.modelAfficherMutuelles()
            if (data) {
                //console.log(data)
                res.render("./patients", { patients: data, mutuelles: data2 })
            }
        } catch (error) {
            console.log(error)
        }


    },




    async ajouterPatient(req, res) {

        try {
            let data = await modelPatients.modelAjouterPatient(req)
            if (data) {
                //console.log(data)
                res.redirect("/patients")
            }
        } catch (error) {
            console.log(error)
        }


    },
    
    async supprimerPatient(req, res) {

        try {
            let data = await modelPatients.modelSupprimerPatient(req)
            if (data) {
                //console.log(data)
                res.redirect("/patients")
            }
        } catch (error) {
            console.log(error)
        }


    },
    
    /**
    * méthode qui envoie la @req à @modelAfficherModifPatient () , sans bloquer le thread principal.
    * le resultat @res , est d'afficher sur la page modifPatient le medicament contenu dans @data .
    */

     async afficherModifPatient(req, res) {

        try {
            let data = await modelPatients.modelAfficherModifPatient(req)
            let data2 = await modelMutuelles.modelAfficherMutuelles(req)

            if (data && data2 ) {
                //console.log(data)
                res.render("./modifpatient", { patient: data, mutuelles: data2 })
            }
        } catch (error) {
            console.log(error)
        }


    },

    /**
    * méthode qui envoie la @req à @modelModifPatient () , sans bloquer le thread principal.
    * le resultat @res , est d'afficher sur la page medicament le medicament contenu dans @data .
    */

    async modifPatient(req, res) {

        try {
            let data = await modelPatients.modelModifPatient(req)
            
            if (data) {
                //console.log(data)
                res.redirect("/patients")
            }

        } catch (error) {
            console.log(error)
        }


    },





}