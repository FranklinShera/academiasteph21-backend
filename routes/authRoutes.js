const express = require('express'); 
const { User } = require('.././models')
const router = express.Router(); 
const bodyParser =  require('body-parser')
const cors = require('cors')

const bcrypt = require('bcrypt')

const app = express();

app.use(cors())
app.use(bodyParser.json());


router.post('/auth/login', async (req, res) => {
    try{

            let user = await User.findOne({ where:{ email : req.body.username}})
            
            if(user == null){
                res.status(404).send({ error : "User Not Found!"})
            }else{
                (bcrypt.compare(req.body.password,user.password)) ? res.send({ auth: true ,
                            message: "Logged In Successfully" ,
                            user:{ id: user.id , name: user.name , email: user.email }
                     })  : res.status(404).send({ error : "Invalid Credentials"})
            }
        

    } catch(err){
        res.status(404).send({error : err})
    }  

})

router.post('/auth/register', async (req, res) => {
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



module.exports = router;
