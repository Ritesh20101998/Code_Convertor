const mongoose = require("mongoose");

const codeConvertorSchema = mongoose.Schema({
    prompt: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    convertedCode: {
        type: String,
        required: true,
    }
    },
{
    versionKey : false
});

const codeConvertorModel = mongoose.model("Codes", codeConvertorSchema);

module.exports = { codeConvertorModel };