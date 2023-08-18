const { Configuration, OpenAIApi } = require("openai");
const { codeConvertorModel } = require("../models/codeConvertorModels")
require("dotenv").config();

// Function to generate completion using OpenAI API
async function generateCompletion(prompt) {
    try {
        const maxTokens = 450;
        const n = 1;

        const configuration = new Configuration({
            apiKey: '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',
        });

        const openai = new OpenAIApi(configuration);

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: maxTokens,
            n: n,
        });

        const { choices } = response.data;
        if (choices && choices.length > 0) {
            const completion = choices[0].text.trim();
            return completion;
        } else {
            throw new Error("No completion choices found in response.");
        }
    } catch (error) {
        console.error("Error generating completion:", error);
        throw error;
    }
}

// Handle incoming requests to the /convert route
const codeConvertorController = async(req, res) => {
    try {
        const { prompt, language } = req.body;
        console.log(prompt)
            // Generate code conversion completion
        let response = await generateCompletion(
            `Convert the following code: ${prompt} to ${language} code. If the code is incorrect or not complete, please make guesses and complete it.`
        );

        const data = new codeConvertorModel({
            prompt: prompt,
            language: language,
            convertedCode: response,
        });
        await data.save();

        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
};

// Handle incoming requests to the /debug route
const codeConvertorControllerDebug = async(req, res) => {
    try {
        const { prompt } = req.body;
        console.log(prompt)
            // Generate code debugging completion
        let response = await generateCompletion(
            `Debug the following code: ${prompt}. Please check if there are any errors and also correct them. Additionally, if the code is correct, provide steps on what the code is doing and how we can improve it.`
        );
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
};

// Handle incoming requests to the /quality route
const codeConvertorControllerQuality = async(req, res) => {
    try {
        const { prompt } = req.body;
        console.log(prompt)
            // Generate code quality check completion
        let response = await generateCompletion(
            `Check the quality of the following code: ${prompt}. Please provide detailed information and also provide some tips to improve. Provide in points.`
        );
        console.log(response);
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
};

module.exports = {
    codeConvertorController,
    codeConvertorControllerDebug,
    codeConvertorControllerQuality,
};