/**
 * @Auteur Brieuc Meyer
 * @Version 1.0.0
 * @Crédits : Gucl Sefa Illian Benaissa => aide sur les asnc : await
*/

const modelAcceuil = require('../models/modelAcceuil.js')
let modelMedicament = require('../models/modelMedicaments.js')



module.exports = {

    async afficherAcceuil(req, res) {

        try {
            /**
             * Remplissage des charts 
             * @param = mois de besoins 
             * le resultat @res , est d'afficher les collections d'objets contenues dans @data et de rediriger après réussite des opérations dans la BDD .
             */
            let data = await modelAcceuil.modelAfficherStockMedicaments()
            let data2 = await modelAcceuil.modelAfficherBesoinsMedicaments(1)
            let data3 = await modelAcceuil.modelAfficherBesoinsMedicaments(2)
            let data4 = await modelAcceuil.modelAfficherBesoinsMedicaments(3)
            let data5 = await modelMedicament.modelbesoinsTotauxMedicaments()
            
            if (data) {
                //console.log(data)
                res.render("accueil", { medicaments: data, moisActuel: data2, moisActuelPlus1: data3, moisActuelPlus2: data4, besoinsedicaments: data5 })
            }
        } catch (error) {
            console.log(error)
        }

    },




}