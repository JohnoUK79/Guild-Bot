const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY }= require('../config.json')

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const listFiles = async function () {
const response = await openai.listFiles();
console.log(response.data)
}
listFiles()