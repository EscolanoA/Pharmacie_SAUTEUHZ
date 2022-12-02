const modelConnexion = require('../models/modelConnexion.js')
const uuidv4 = require('uuid').v4;
const sessions = require('express-session');


module.exports = {
    

    async afficherConnexion(req, res) {
        res.render('./connexion')
    },

    async testConnexion(req, res) {


        let email = req.body.email
        let mdp = req.body.mdp

        try {
            let data = await modelConnexion.modelTestConnexion(req,res)

            if (data && data[0].parmacien_email == email && data[0].parmacien_mdp == mdp) {
                //console.log(data[0].parmacien_email, data[0].parmacien_mdp)
                const sessionId = uuidv4();
                sessions[sessionId] = {email, userId: 1};
                res.set('Set-Cookie',`session=${sessionId}`)
                console.log(sessions[sessionId])
                res.render('./accueil')
            }
            //res.render('./connexion')


        } catch (error) {
            console.log(error)
        }


        
    }



}