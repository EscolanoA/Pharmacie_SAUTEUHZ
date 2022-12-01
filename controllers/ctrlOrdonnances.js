const modelOrdonnances = require('../models/modelOrdonnances.js')
const modelMedecins = require('../models/modelMedecins.js')
const modelPathologies = require('../models/modelPathologies.js')
const modelPatients = require('../models/modelPatients.js')
const modelPosologies = require('../models/modelPosologies.js')


module.exports = {


    async afficherOrdonnances(req, res) {

        try {
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
                res.redirect("/patients/ordonnances/" + req.body.numsecu)
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

    async afficherModifOrdonnance(req, res) {

        try {
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