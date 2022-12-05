const sessions = require('express-session');
module.exports = {

    async afficherAcceuil(req, res) {
        //?.split('='[1])
        //console.log(sessions)
        console.log(req.headers.cookie.split('='))
        
        const sessionId = req.headers.cookie?.split('session=')[1]
        
        const userSession = sessions[sessionId]
        //console.log(userSession)
        if (!userSession) {
            res.render('./connexion')

        } else { res.render('./accueil') }


    },

}