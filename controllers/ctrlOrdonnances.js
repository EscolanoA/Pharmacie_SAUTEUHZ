const modelOrdonnances = require('../models/modelOrdonnances.js')
const modelMedecins = require('../models/modelMedecins.js')
const modelPathologies = require('../models/modelPathologies.js')


module.exports = {


    async afficherOrdonnances(req, res) {

        try {
            let data = await modelOrdonnances.modelAfficherOrdonnances(req,res)
            let data2 = await modelMedecins.modelAfficherMedecins()
            let data3 = await modelPathologies.modelAfficherPathologies()
            
            if (data) {
                //console.log(data)
                res.render("./ordonnances", { ordonnances: data, medecins: data2, pathologies: data3 })
            }
        } catch (error) {
            console.log(error)
        }


    },
    async ajouterOrdonnance(req, res) {

        try {
            let data = await modelOrdonnances.modelAjouterOrdonnance(req,res)
            if (data) {
                //console.log(data)
                res.redirect("/patients/ordonnances/" + req.body.numsecu)
            }
        } catch (error) {
            console.log(error)
        }


    },


}