const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY }= require('../config.json')

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const file = 'file-BWwtNNYvRXjkofopVeJdwS0V'
const openai = new OpenAIApi(configuration);
const downloadFile = async function () {
const response = await openai.downloadFile(file);
console.log(response.data)
}
downloadFile()