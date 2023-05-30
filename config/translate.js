const fs = require('fs')
const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY }= require('../config.json')

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const createTranslation = async function () {
const resp = await openai.createTranslation(
  fs.createReadStream("audio.mp3"),
  "whisper-1"
);
console.log(resp.data)
}
createTranslation()