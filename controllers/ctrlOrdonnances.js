/**
 * @Auteur Brieuc Meyer
 * @Version 1.0.0
 * @Crédits : Guclu Sefa Illian Benaissa => aide sur les asnc : await
*/

const modelOrdonnances = require('../models/modelOrdonnances.js')
const modelMedecins = require('../models/modelMedecins.js')
const modelPathologies = require('../models/modelPathologies.js')
const modelPatients = require('../models/modelPatients.js')


module.exports = {

    /**
    * méthodes qui envoient la @req au @modelMutuelles () ,@modelMedecins (),@modelPathologies (),@modelPatients () sans bloquer le thread principal.
    * le resultat @res , est d'afficher les données contenues dans @data et/ou de rediriger après une opération réussi vers la BDD .
    */

    async afficherOrdonnances(req, res) {

        try {
            /**
             * @param req contient les data du body du dom
             */
            let data = await modelOrdonnances.modelAfficherOrdonnances(req, res)
            let data2 = await modelMedecins.modelAfficherMedecins()
            let data3 = await modelPathologies.modelAfficherPathologies()
            let data4 = await modelPatients.modelAfficherModifPatient(req)

            if (data) {
                //console.log(data)
                res.render("./ordonnances", { ordonnances: data, medecins: data2, pathologies: data3, patient_numsecu: req.params.numsecu, infospatient: data4})
            }
        } catch (error) {
            console.log(error)
        }


    },
    async ajouterOrdonnance(req, res) {

        try {
            let data = await modelOrdonnances.modelAjouterOrdonnance(req, res)
            if (data) {
                //console.log(data)
                //rediriger vers le patient à qui appartient les ordonnances
                res.redirect("/patients/ordonnances/" + req.body.numsecu)
            }
        } catch (error) {
            console.log(error)
        }


    },
    async supprimerOrdonnance(req, res) {

        try {
        /**
         * @param req contient le param id a suprimmer
         */
            let data = await modelOrdonnances.modelSupprimerOrdonnance(req)
            if (data) {
                //console.log(data)
                res.redirect("/patients/ordonnances/" + req.params.numsecu)
            }
        } catch (error) {
            console.log(error)
        }


    },

    async afficherModifOrdonnance(req, res) {

        try {
            /**
             * @param req contient les data de la l'oronnance a modifier
             */
            let data = await modelOrdonnances.modelafficherModifOrdonnance(req)
            let data2 = await modelMedecins.modelAfficherMedecins(req)
            let data3 = await modelPathologies.modelAfficherPathologies(req)

            if (data) {
                //console.log(data)
                res.render("./modifOrdonnance", { ordonnance: data , medecins: data2 , pathologies: data3})
            }
        } catch (error) {
            console.log(error)
        }


    },

    async modifOrdonnance(req, res) {

        try {
            /**
             * @param req envoie à la BDD les data de la mutu a modifier
             */
            let data = await modelOrdonnances.modelmodifOrdonnance(req)
            if (data) {
                //console.log(data)
                res.redirect("/patients/ordonnances/" + req.body.numsecu)
            }

        } catch (error) {
            console.log(error)
        }


    }


}