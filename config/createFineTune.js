const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY }= require('../config.json')

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const file = 'file-KE5nQiPMKhYkEEZERiEkUkYl'
const openai = new OpenAIApi(configuration);
const fineTune = async function () {
const response = await openai.createFineTune({
    training_file: file,
    model: 'davinci'
  })
  console.log('response: ', response)
}
fineTune()