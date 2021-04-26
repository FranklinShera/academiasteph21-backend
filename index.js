const express = require('express')
const bodyParser =  require('body-parser')
const cors = require('cors')
const { requireLogin } = require('./middleware/auth')


require('./Helpers/dbConnection')


const app = express();
const port = '5000'





app.use(cors());
app.use(bodyParser.json());



// MODELS
const { User , Category } = require('./models')


//MIDDLEWARE
const AuthRoutes = require('./routes/authRoutes')




app.get('/', (req,res) => {
    res.send('Welcome To AcademisSteph21!')
})

app.use('/auth',AuthRoutes);


app.get('/reviews', (req, res) => {
  
   res.status(200).send([
    {
        customerName: 'Franklin Shera',
        rating: 3.5,
        created_at: "JUN 28, 2020",
        remarks: `The writer worked for everything I 
            needed. I had some questions that were 
            answered promptly and professionally.  

            And.... they validated that my experiences  
            could work towards a new career!`
    },
    {
        customerName: 'Kimani Stephen',
        rating: 4.5,
        created_at: "MAY 09, 2018",
        remarks: `The writer worked for everything I 
            needed. I had some questions that were 
            answered promptly and professionally.  

            And.... they validated that my experiences  
            could work towards a new career!`
    },
    {
        customerName: 'Ann Kanyiva',
        rating: 5,
        created_at: "SEP 21, 2016",
        remarks: `The writer worked for everything I 
            needed. I had some questions that were 
            answered promptly and professionally.  

            And.... they validated that my experiences  
            could work towards a new career!`
    }
    ,
    {
        customerName: 'Jane Mutheu',
        rating: 3.5,
        created_at: "JUL 11, 2017",
        remarks: `The writer worked for everything I 
            needed. I had some questions that were 
            answered promptly and professionally.  

            And.... they validated that my experiences  
            could work towards a new career!`
    }
    ,
    {
        customerName: 'Winstone Avoze',
        rating: 2.5,
        created_at: "JAN 25, 2018",
        remarks: `The writer worked for everything I 
            needed. I had some questions that were 
            answered promptly and professionally.  

            And.... they validated that my experiences  
            could work towards a new career!`
    }
    ,
    {
        customerName: 'Agnes Nzakwa',
        rating: 0,
        created_at: "FEB 15, 2020",
        remarks: `The writer worked for everything I 
            needed. I had some questions that were 
            answered promptly and professionally.  

            And.... they validated that my experiences  
            could work towards a new career!`
    }

])
})





//POST
app.post('/category',(req, res) =>{
    Category.create({
                    customerName: req.body.customerName,
                    rating: req.body.rating,
                    remarks: req.body.remarks,
                }).catch((err) => {
                    console.log(err);
                })

    res.send({ message : "Category Added!" })
})



//ALL
app.get('/categories',(req, res) =>{
    Category.findAll().then((categories) => {
        res.send(categories)
    }).catch((err) => {
        res.send(err)
    })
})



//SINGLE 
app.get('/category/:id',(req, res) =>{
    Category.findAll({ where:{ id: req.params.id } }).then((categories) => {
        res.send(categories)
    }).catch((err) => {
        res.send(err)
    })
})




//DELETE
app.delete('/category/:id',(req, res) =>{
    
    Category.destroy({ where:{ id: req.params.id } });

    res.send("Deleted!")
    
})







const dbModels = require('./models')

dbModels.sequelize.sync().then((req) => {
    app.listen(port,() => console.log("Server Running @ "+port));
})

