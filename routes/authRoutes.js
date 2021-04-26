const express = require('express'); 
const { User } = require('.././models')
const router = express.Router(); 
const bodyParser =  require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config();



const app = express();






app.use(cors())
app.use(bodyParser.json());










router.post('/login', async (req, res) => {
    try{

            let user = await User.findOne({ where:{ email : req.body.username}})
            
            if(user == null){
                res.status(422).send({ error : "User Not Found!"})
            }

            const isMatching = await bcrypt.compare(req.body.password,user.password);

            if(isMatching){
                    const token = jwt.sign({ 
                                                iss: "www.academiasteph21",
                                                aud: user.id
                                            },
                                            process.env.ACCESS_TOKEN_SECRET,
                                            { 
                                                expiresIn: 600000
                                            })

                    const refreshToken = jwt.sign({ 
                                                iss: "www.academiasteph21",
                                                aud: user.id
                                            },
                                            process.env.REFRESH_TOKEN_SECRET,
                                            { 
                                                expiresIn: '1y',
                                            })
                    
                res.send({ auth: true ,
                    message: "Logged In Successfully" ,
                    user:{ id: user.id , name: user.name , email: user.email },
                    access_token: token,
                    refresh_token: refreshToken
                })  

            }else{
                res.status(404).send({ error : "Invalid Credentials"})
            }
        
        

    } catch(err){
        res.status(404).send({error : err})
    }  

})

router.post('/register', async (req, res) => {
    try{
        User.create({
            name : req.body.name,
            email : req.body.email,
            password : await bcrypt.hash(req.body.password, 7)
        }).catch((err) => {
            res.status(404).send({error: err});
        })
        
    
        res.status(201).send({ message: "Registration Successful!"})   

    } catch(err){
        res.send({error : err})
    }  

})




router.post('/refresh-token', async (req, res) => {
    try{
        const token = req.body.refreshToken

        if(!token){
            throw new Error("Token Not Found!");
        }

        

        const decodedToken = jwt.verify(token,process.env.REFRESH_TOKEN_SECRET)

        let tokenUser = await User.findOne({ where:{ id : decodedToken.aud }})


        

        if(!tokenUser){
            throw new Error("Token Credentials Invalid!");
        }




        const newtoken = jwt.sign({ 
                    iss: "www.academiasteph21",
                    aud: decodedToken.aud
                },
                process.env.ACCESS_TOKEN_SECRET,
                { 
                    expiresIn: 600000
                })



        const newRefreshToken = jwt.sign({ 
                    iss: "www.academiasteph21",
                    aud: decodedToken.aud
                },
                process.env.REFRESH_TOKEN_SECRET,
                { 
                    expiresIn: '1y',
                })



        res.send({ 
            auth: true ,
            message: "Logged In Successfully" ,
            user:{ id: tokenUser.id , name: tokenUser.name , email: tokenUser.email },
            access_token: newtoken,
            refresh_token: newRefreshToken
        })


    } catch(err){

        res.send({error : err})

    }  

})




router.delete('/logout', async (req, res) => {
    try{
       res.send('Logout')

    } catch(err){
        res.send({error : err})
    }  

})




module.exports = router;
