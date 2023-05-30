const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY }= require('../config.json')

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const fineTune = 'ft-bOelI0Xav3KzRThmIb9e2cOC'
const listFineTuneEvents = async function () {
const openai = new OpenAIApi(configuration);
const response = await openai.listFineTuneEvents(fineTune);
console.log(response.data)
}
listFineTuneEvents()