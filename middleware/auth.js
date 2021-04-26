// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lciI6eyJpZCI6NCwibmFtZSI6IkZyYW5rbGluIFNoZXJhIiwiZW1haWwiOiJmc2hlcmE5NkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwNyQyZ25OdTBvVkZ4UmovN2lqdDYxcVBPSDR6Q1h4LnhJLnNQTkE4Qk96M09uODdCc0tHRVBSUyIsImNyZWF0ZWRBdCI6IjIwMjEtMDQtMjNUMjE6MDY6MTAuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDQtMjNUMjE6MDY6MTAuMDAwWiJ9LCJpYXQiOjE2MTkyMTQzMTgsImV4cCI6MTYxOTIyNDMxOH0.Tlbtzd8S4mHkbAyPFHQzXCNBIVdB1GKt3DMIQafWoX4


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
            res.status(400).json({message: "Unauthorised!"})
        }
    } catch (error) {

        res.status(400).json({message: "Bad Request Try Again!"})    
    }
}