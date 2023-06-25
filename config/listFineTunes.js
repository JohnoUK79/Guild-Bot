const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY }= require('../config.json')

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const listFineTunes = async function () {
const response = await openai.listFineTunes();
console.log(response.data)
}
listFineTunes()