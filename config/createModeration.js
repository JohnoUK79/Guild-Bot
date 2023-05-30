const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY }= require('../config.json')

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const moderation = async function () {
const response = await openai.createModeration({
  input: "I want to kill them.",
});
console.log(response.data.results)
}
moderation()