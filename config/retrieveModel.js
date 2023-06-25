const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY }= require('../config.json')

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const model = 'curie:ft-personal-2023-05-29-15-15-28'
const openai = new OpenAIApi(configuration);
const retrieveModel = async function () {
const response = await openai.retrieveModel(model);
console.log(response.data)
}
retrieveModel()