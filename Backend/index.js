const express = require('express')
const cors = require('cors')
require('dotenv').config();

const app = express()

const {connection} = require("./config/db");
const {codeConvertorRouter} = require('./routes/codeConvertorRoutes')

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:blue;text-align:center">Welcome to Code Conversion Generator Backend</h1>`)
})

app.use('/api',codeConvertorRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log('Connected to Database...')
    } catch(err){
        console.log('Not Connected to Database...')
        console.log(err.message);
    }
    console.log(`Server connected to port ${process.env.port}`)
})