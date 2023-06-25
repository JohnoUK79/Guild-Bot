const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY }= require('../config.json')

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const fineTune = 'ft-OVt8300zEwhvLD6FUKQiBsRn'
const openai = new OpenAIApi(configuration);
const retrieveFineTune = async function () {
const response = await openai.retrieveFineTune(fineTune);
console.log(response.data)
}
retrieveFineTune()