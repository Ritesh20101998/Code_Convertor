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
        type: String
    }
}, {
    versionKey: false
});

const codeConvertorModel = mongoose.model("CodeConvertor", codeConvertorSchema);

module.exports = { codeConvertorModel };