const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY, OPEN_AI_ORGANISATION } = require('../config.json')
module.exports = {
    chatResponse: async function (message) {
		target = message.content

        const configuration = new Configuration({
            apiKey: OPENAI_API_KEY,
            organization: OPEN_AI_ORGANISATION,
          });
          const openai = new OpenAIApi(configuration);
    async function runCompletion () {
    const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: target,
    max_tokens:4000
    });
    console.log(completion.data.choices[0].text);
    }
    runCompletion();
    }
}