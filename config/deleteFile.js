const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY }= require('../config.json')

const file = 'file-jxELSSszAAiL0IZBZodN2yCh'
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const deleteFile = async function () {
const response = await openai.deleteFile(file);
console.log(response.data)
}
deleteFile()