const jwt = require('jsonwebtoken')

module.export = (res,req,next) =>{
    try{
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, 'secret');
        rq.userDate = decoded;
    }catch(error){
        return res.status(401).json({
            message: "auth failed"
        })
    }
    
    next()
}