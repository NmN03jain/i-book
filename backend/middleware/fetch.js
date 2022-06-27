var jwt = require('jsonwebtoken');
const jwt_secret = "someoneisgoodboy"

const fetch = (req, res, next) => {
    const token = req.header("authen")
    if(!token){
        res.status(401).send({error:"pls authenticatee using a valid token"});

    }
    try {
        const data = jwt.verify(token,jwt_secret);
        req.user = data.user
        next();
        
    } catch (error) {
        res.status(401).send({error: "pls check you token"})
        
    }
     


}
module.exports = fetch;