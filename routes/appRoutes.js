const express = require('express'); 
const { AcademicLevel } = require('.././models')
const router = express.Router(); 
const bodyParser =  require('body-parser')
const cors = require('cors')
require('dotenv').config();



const app = express();



app.use(cors())
app.use(bodyParser.json());










module.exports = router;
