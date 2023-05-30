const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY }= require('../config.json')

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const model = 'curie:ft-personal-2023-05-29-13-12-35'
const openai = new OpenAIApi(configuration);
const deleteModel = async function () {
const response = await openai.deleteModel(model);
console.log(response.data)
}
deleteModel()