const fs = require('fs')
const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY }= require('../config.json')

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const transcribe = async function () {
const resp = await openai.createTranscription(
  fs.createReadStream("audio.mp3"),
  "whisper-1"
);
console.log(resp.data)
}
transcribe()