const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY }= require('../config.json')

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const file = 'file-P2pGdz8tWYrBcUGAFDdyX7Sk'
const openai = new OpenAIApi(configuration);
const fineTune = async function () {
const response = await openai.createFineTune({
    training_file: file,
    model: 'davinci:ft-personal-2023-05-29-21-36-32'
  })
  console.log('response: ', response)
}
fineTune()