/**
 * @Auteur Brieuc Meyer
 * @Version 1.0.0
 * @Crédits : Guclu Sefa Illian Benaissa => aide sur les asnc : await
*/

//importer les models d'accès aux donnés (requetes SQL)
let modelMedicament = require('../models/modelMedicaments.js')

module.exports = {    
    /**
    * méthodes qui envoient la @req au @modelMedicament () , sans bloquer le thread principal.
    * le resultat @res , est d'afficher les données contenues dans @data et/ou de rediriger après une opération réussi vers la BDD .
    */
    async afficherMedicaments(req, res) {

        try {
            let data = await modelMedicament.modelAfficherMedicaments()
            let data2 = await modelMedicament.modelbesoinsTotauxMedicaments()

            if (data) {
                //console.log(data)
                res.render("./medicaments", { medicaments: data, besoinsedicaments: data2 })
            }
        } catch (error) {
            console.log(error)
        }


    },

    async ajouterMedicament(req, res) {

        try {
            /**
             * @param req contient les data du body du dom
             */
            let data = await modelMedicament.modelAjouterMedicament(req)
            if (data) {
                res.redirect("/medicaments")
            }
        } catch (error) {
            console.log(error)
        }


    },


    async supprimerMedicament(req, res) {

        try {
            /**
             * @param req contient le param id a suprimmer
             */
            let data = await modelMedicament.modelSupprimerMedicament(req)
            if (data) {
                res.redirect("/medicaments")
            }
        } catch (error) {
            console.log(error)
        }


    },
    async afficherModifMedicament(req, res) {

        try {
            /**
             * @param req contient les data du medicament a modifier
             */
            let data = await modelMedicament.modelafficherModifMedicament(req)
            if (data) {
                //console.log(data)
                res.render("./modifMedicament", { medicament: data })
            }
        } catch (error) {
            console.log(error)
        }


    },


    async modifMedicament(req, res) {

        try {
            /**
             * @param req envoie à la BDD les data du medicament a modifier
             */
            let data = await modelMedicament.modelmodifMedicament(req)
            if (data) {
                //console.log(data)
                res.redirect("/medicaments")
            }

        } catch (error) {
            console.log(error)
        }


    }

}

