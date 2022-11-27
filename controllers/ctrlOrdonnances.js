const modelOrdonnances = require('../models/modelOrdonnances.js')


module.exports = {


    async afficherOrdonnances(req, res) {

        try {
            let data = await modelOrdonnances.modelAfficherOrdonnances(req,res)
            if (data) {
                //console.log(data)
                res.render("./ordonnances", { ordonnances: data })
            }
        } catch (error) {
            console.log(error)
        }


    },


}