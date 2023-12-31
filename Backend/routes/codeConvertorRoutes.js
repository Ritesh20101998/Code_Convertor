const express = require("express");
const codeConvertorRouter = express.Router();

const {
    codeConvertorController,
    codeConvertorControllerDebug,
    codeConvertorControllerQuality,
} = require("../controllers/codeConvertorController");

codeConvertorRouter.get("/", (req, res) => {
    res.send("Welcome to api")
})

// Endpoint for converting code
codeConvertorRouter.post("/convert", codeConvertorController);

// Endpoint for debugging code
codeConvertorRouter.post("/debug", codeConvertorControllerDebug);

// Endpoint for checking code quality
codeConvertorRouter.post("/quality", codeConvertorControllerQuality);

module.exports = { codeConvertorRouter };