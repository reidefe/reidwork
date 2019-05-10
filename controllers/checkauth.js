const jwt = require('jsonwebtoken');

exports.auth = (req,res,next) =>{
    try{
        //const token = req.headers.authorization;
        const decoded = jwt.verify(req.body.token, 'secret', );
        //console.log(token)
        req.userData = decoded;
    }catch(error){
        return res.status(401).json({
            message: "failed to delete user"
        })
    }

    next()
};