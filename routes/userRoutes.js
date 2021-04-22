const express = require('express'); 
const User = require('.././models/User')
const router = express.Router(); 



router.get('/User', async (req, res) => {
    
    const newUser = new User(req.body)


    try{

      const savedUser = await newUser.save()

      res.json(savedUser)

    }catch(error){

      res.json({message: error})

    }  
         

})



module.exports = router;
