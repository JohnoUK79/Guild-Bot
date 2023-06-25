const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY }= require('../config.json')

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const file = 'file-HHf0RDw1eeV2nvgXfy8YstXj'
const openai = new OpenAIApi(configuration);
const retriveFile = async function () {
const response = await openai.retrieveFile(file);
console.log(response.data)
}
retriveFile()