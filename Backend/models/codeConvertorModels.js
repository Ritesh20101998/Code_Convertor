const mongoose = require("mongoose");

const codeConvertorSchema = mongoose.Schema({
    prompt: String,
    language: String,
    convertedCode: String
    
}, {
    versionKey: false
});

const codeConvertorModel = mongoose.model("CodeConvertor", codeConvertorSchema);

module.exports = { codeConvertorModel };