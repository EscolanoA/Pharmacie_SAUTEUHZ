const modelOrdonnances = require('../models/modelOrdonnances.js')
const modelPosologies = require('../models/modelPosologies.js')
const modelMedicaments = require('../models/modelMedicaments.js')


module.exports = {


    async afficherPosologies(req, res) {

        try {
            let data = await modelPosologies.modelAfficherInfoOrdonnance(req, res)
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
            let data = await modelOrdonnances.modelAjouterPosologie(req, res)
            if (data) {
                //console.log(data)
                res.redirect("/patients/ordonnances/posologies/" + req.body.idordo)
            }
        } catch (error) {
            console.log(error)
        }


    },
    async supprimerOrdonnance(req, res) {

        try {
            let data = await modelOrdonnances.modelSupprimerOrdonnance(req)
            if (data) {
                //console.log(data)
                res.redirect("/patients/ordonnances/" + req.params.numsecu)
            }
        } catch (error) {
            console.log(error)
        }


    },


}