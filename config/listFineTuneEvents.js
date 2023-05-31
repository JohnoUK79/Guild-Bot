const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY }= require('../config.json')

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const fineTune = 'ft-8ARRvS6TplbG1NiMpIrS6Jll'
const listFineTuneEvents = async function () {
const openai = new OpenAIApi(configuration);
const response = await openai.listFineTuneEvents(fineTune);
console.log(response.data)
}
listFineTuneEvents()