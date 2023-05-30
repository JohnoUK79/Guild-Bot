const fs = require("fs");
const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY }= require('../config.json')

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const newFile = async function () {
const response = await openai.createFile(
  fs.createReadStream("training.txt"),
  "fine-tune"
);
console.log(response.data)
}
newFile()