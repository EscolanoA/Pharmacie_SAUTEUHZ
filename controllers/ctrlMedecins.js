//importer les models d'accès aux donnés (requetes SQL)
const modelMedecins = require('../models/modelMedecins.js')



module.exports = {

    async afficherMedecins(req, res) {

        try {
            let data = await modelMedecins.modelAfficherMedecins()
            if (data) {
                //console.log(data)
                res.render("./medecins", { medecins: data })
            }
        } catch (error) {
            console.log(error)
        }


    },


    async ajouterMedecin(req, res) {

        try {
            let data = await modelMedecins.modelAjouterMedecin(req)
            if (data) {
                console.log(data)
                res.redirect("/medecins")
            }
        } catch (error) {
            console.log(error)
        }


    },
    
    async supprimerMedecin(req, res) {

        try {
            let data = await modelMedecins.modelSupprimerMedecin(req)
            
            if (data) {
                //console.log(data)
                res.redirect("/medecins")
            }

        } catch (error) {
            console.log(error)
        }


    },

    async afficherModifMedecin(req, res) {

        try {
            let data = await modelMedecins.modelAfficherModifMedecin(req)
            if (data ) {
                //console.log(data)
                res.render("./modifMedecin", { medecin: data })
            }
        } catch (error) {
            console.log(error)
        }


    },

    /**
    * méthode qui envoie la @req à @modelModifPatient () , sans bloquer le thread principal.
    * le resultat @res , est d'afficher sur la page medicament le medicament contenu dans @data .
    */

    async modifMedecin(req, res) {

        try {
            let data = await modelMedecins.modelModifMedecin(req)
            
            if (data) {
                //console.log(data)
                res.redirect("/medecins")
            }

        } catch (error) {
            console.log(error)
        }


    },



}