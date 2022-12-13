/**
 * @Auteur Brieuc Meyer
 * @Version 1.0.0
 * @Crédits : Guclu Sefa Illian Benaissa => aide sur les asnc : await
*/

//importer les models d'accès aux donnés (requetes SQL)
const modelPatients = require('../models/modelPatients.js')
const modelMutuelles = require('../models/modelMutuelles.js')



module.exports = {

    /**
    * méthodes qui envoient la @req au @modelMutuelles () , sans bloquer le thread principal.
    * le resultat @res , est d'afficher les données contenues dans @data et/ou de rediriger après une opération réussi vers la BDD .
    */

    async afficherPatients(req, res) {

        try {
            /**
             * @data sont la collection mutuelles, pour afficher dans la vue la mutuelle qui
             * correspond au patient, le nombre de mutuelles est faible, le traitement dans la vue est aproprié
             */
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
            /**
             * @param req contient les data du body du dom
             */
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
            /**
             * @param req contient le param id a suprimmer
             */
            let data = await modelPatients.modelSupprimerPatient(req)
            if (data) {
                //console.log(data)
                res.redirect("/patients")
            }
        } catch (error) {
            console.log(error)
        }


    },

    
    async afficherModifPatient(req, res) {

        try {
            /**
             * @param req contient les data du patient et de sa mutuelle a modifier
             */
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

    async modifPatient(req, res) {

        try {
            /**
             * @param req envoie à la BDD les data de la pathologie a modifier
             */
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