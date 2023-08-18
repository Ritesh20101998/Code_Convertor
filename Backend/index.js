const express = require('express')
    // const cors = require('cors')
const bodyParser = require("body-parser");
const Axios = require('axios')
require('dotenv').config();

const app = express()
app.use(express.json())
app.use(bodyParser.json());
// app.use(cors())


const { connection } = require("./config/db");
const {
    codeConvertorController,
    codeConvertorControllerQuality,
    codeConvertorControllerDebug,
} = require("./controllers/codeConvertorController");

// Define your routes
app.get("/convert", codeConvertorController);
app.get("/quality", codeConvertorControllerQuality);
app.get("/debug", codeConvertorControllerDebug);

app.get('/', (req, res) => {
    res.status(200).send(`<h1 style="color:red;text-align:center">Welcome to Code Convertor Generator Backend</h1>`)
})

app.listen(process.env.port, async(req, res) => {
    try {
        await connection
        console.log('Connected to Database...')
    } catch (err) {
        console.log('Not Connected to Database...')
        console.log(err.message);
    }
    console.log(`Server connected to port ${process.env.port}`)
})