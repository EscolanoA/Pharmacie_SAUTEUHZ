const sessions = require('express-session');
module.exports = {

    async afficherAcceuil(req, res) {
        const sessionId = req.headers.cookie?.split('='[1])
        const userSession = sessions[sessionId]
        if (!userSession) {
            res.render('./connexion')
            
        } else { res.render('./accueil') }


    },

}