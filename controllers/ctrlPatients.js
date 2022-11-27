//importer les models d'accès aux donnés (requetes SQL)
const modelPatients = require('../models/modelPatients.js')
const modelMutuelles = require('../models/modelMutuelles.js')



module.exports = {



    async afficherPatients(req, res) {

        try {
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
            let data = await modelPatients.modelSupprimerPatient(req)
            if (data) {
                //console.log(data)
                res.redirect("/patients")
            }
        } catch (error) {
            console.log(error)
        }


    },





}