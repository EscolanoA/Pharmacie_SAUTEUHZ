//importer les models d'accès aux donnés (requetes SQL)
const modelMedecins = require('../models/modelMedecins.js')

//SYNTEC : convention collective informatique 
//Grille Bac+3 27/ 30k
// Bac +5 : 35 k  

module.exports = {

    /**
    * méthodes qui envoient la @req au @modelMedecin () , sans bloquer le thread principal.
    * le resultat @res , est d'afficher les données contenues dans @data .
    */

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
            /**
             * @param req contient les data du body du dom
             */
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
        /**
         * @param req contient le param id a suprimmer
         */
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
            /**
             * @param req contient les data du medecin a modifier
             */
            let data = await modelMedecins.modelAfficherModifMedecin(req)
            if (data ) {
                //console.log(data)
                res.render("./modifMedecin", { medecin: data })
            }
        } catch (error) {
            console.log(error)
        }


    },


    async modifMedecin(req, res) {

        try {
            /**
             * @param req envoie à la BDD les data du medecin a modifier
             */
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