/**
 * @Auteur Brieuc Meyer
 * @Version 1.0.0
 * @Crédits : Guclu Sefa Illian Benaissa => aide sur les asnc : await
*/

const modelOrdonnances = require('../models/modelOrdonnances.js')// TO DO il fautdrai utiliser ce module pour afficher les infos de l'odonnance meme quans il ny a pas de posologies dessus
const modelPosologies = require('../models/modelPosologies.js')
const modelMedicaments = require('../models/modelMedicaments.js')


module.exports = {


    async afficherPosologies(req, res) {

        try {
            let data = await modelOrdonnances.modelAfficherOrdonnances(req, res)//modele a utiliser ici : modelOrdonnances, il faut ajouter une fonction dedans nomée modelAfficherInfoOrdonnancePosologie our afficher les infos de l'ordonnance correspndante a la posologie
            let data2 = await modelPosologies.modelAfficherPosologies(req, res)
            let data3 = await modelMedicaments.modelAfficherMedicaments(req, res)
            let data4 = await modelPosologies.modelAfficherInfoMedecinEtPath(req, res)


            if (data) {

                res.render("./posologies", { infosordo : data, idordo : req.params.idordo, posologies : data2 , medicaments : data3, medecinpath: data4})
            }
        } catch (error) {
            console.log(error)
        }


    },
    async ajouterPosologie(req, res) {

        try {
            let data = await modelPosologies.modelAjouterPosologie(req, res)
            if (data) {
                //console.log(data)
                res.redirect("/patients/ordonnances/"+req.body.numsecu+"/posologies/" + req.body.idordo)
            }
        } catch (error) {
            console.log(error)
        }


    },
    async supprimerPosologie(req, res) {

        try {
            let data = await modelPosologies.modelSupprimerPosologie(req)
            if (data) {
                console.log(data)
                res.redirect("/patients/ordonnances/"+req.params.numsecu+"/posologies/" + req.params.idordo)
            }
        } catch (error) {
            console.log(error)
        }


    },
    async afficherModifPosologie(req, res) {

        try {
            let data = await modelPosologies.modelAfficherModifPosologie(req)
            let data2 = await modelMedicaments.modelAfficherMedicaments(req)
            if (data ) {
                //console.log(data)
                res.render("./modifPosologie", { posologie: data , medicaments: data2})
            }
        } catch (error) {
            console.log(error)
        }


    },


    async modifPosologie(req, res) {

        try {
            let data = await modelPosologies.modelModifPosologie(req)
            
            if (data) {
                //console.log(data)
                res.redirect("/patients/ordonnances/"+req.body.numsecu+"/posologies/" + req.body.idordo)
            }

        } catch (error) {
            console.log(error)
        }


    },

}