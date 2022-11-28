const modelOrdonnances = require('../models/modelOrdonnances.js')// TO DO il fautdrai utiliser ce module pour afficher les infos de l'odonnance meme quans il ny a pas de posologies dessus
const modelPosologies = require('../models/modelPosologies.js')
const modelMedicaments = require('../models/modelMedicaments.js')


module.exports = {


    async afficherPosologies(req, res) {

        try {
            let data = await modelPosologies.modelAfficherInfoOrdonnance(req, res)//modele a utiliser ici : modelOrdonnances, il faut ajouter une fonction dedans nomée modelmodelAfficherInfoOrdonnancePosologie our afficher les infos de l'ordonnance correspndante a la posologie
            let data2 = await modelPosologies.modelAfficherPosologies(req, res)
            let data3 = await modelMedicaments.modelAfficherMedicaments(req, res)

            if (data) {

                res.render("./posologies", { infosordo : data, idordo : req.params.idordo, posologies : data2 , medicaments : data3})
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
                res.redirect("/patients/ordonnances/posologies/" + req.body.idordo)
            }
        } catch (error) {
            console.log(error)
        }


    },
    async supprimerPosologie(req, res) {

        try {
            let data = await modelPosologies.modelSupprimerPosologie(req)
            if (data) {
                //console.log(data)
                res.redirect("/patients/ordonnances/posologies/" + req.body.idpos)
            }
        } catch (error) {
            console.log(error)
        }


    },


}