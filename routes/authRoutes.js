const express = require('express'); 
const { User } = require('.././models')
const router = express.Router(); 
const bodyParser =  require('body-parser')
const cors = require('cors')

const hashHelper = require('./Helpers/Hashing')

const app = express();

app.use(cors())
app.use(bodyParser.json());


router.post('/auth/login', async (req, res) => {
    try{

        User.findAll({ where:{ email : req.body.username}}).then((users) => {
            
            if(users.length == 0){
                res.send({ error : "Invalid Credentials"})
            }else{
                (users[0].password === req.body.password) ? res.send({ auth: true ,
                            message: "Logged In Successfully" ,
                            user:{ id: users[0].id , name: users[0].name , email: users[0].email }
                     })  : res.send({ error : "Invalid Credentials"})
            }
        }).catch((err) => {
            res.send({ error : err})
        }) 

    } catch(err){
        res.send({error : err})
    }  

})

router.post('/auth/register', async (req, res) => {
    try{
        // User.create({
        //     name : "Franklin Shera",
        //     email : req.body.username,
        //     password : req.body.password
        // }).catch((err) => {
        //     console.log(err);
        // })
        
    
        res.send(hashHelper.hashPassword())   

    } catch(err){
        res.send({error : err})
    }  

})



module.exports = router;
