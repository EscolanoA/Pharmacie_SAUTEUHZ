//importer les models d'accès aux donnés (requetes SQL)
const modelPatients = require('../models/modelPatients.js')


module.exports = {



    async afficherPatients(req, res) {

        try {
            let data = await modelPatients.modelAfficherPatients()
            let data2 = await modelPatients.modelAfficherMutuelles()
            if (data) {
                //console.log(data)
                res.render("./patients", { patients: data, mutuelles: data2 })
            }
        } catch (error) {
            console.log(error)
        }


    },

    

    
    async ajouterMutuelle(req, res) {

        try {
            let data = await modelPatients.modelAjouterMutuelle(req)
            if (data) {
                //console.log(data)
                res.redirect("/patients")
            }
        } catch (error) {
            console.log(error)
        }


    },





}