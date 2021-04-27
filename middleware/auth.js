
const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.requireLogin = (req, res , next)=>{

    try {
        
        if(req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token,process.env.KEY)

            req.user = decoded

            next()
        }else{
            res.status(400).json({ message: "Unauthorised!" })
        }
    } catch (error) {

        res.status(400).json({message: "Bad Request Try Again!"})    
    }
}