const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY }= require('../config.json')

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const fineTune = 'ft-bOelI0Xav3KzRThmIb9e2cOC'
const openai = new OpenAIApi(configuration);
const cancel = async function () {
const response = await openai.cancelFineTune(fineTune);
console.log(response.data)
}
cancel()