const { Configuration, OpenAIApi } = require('openai');
const { OPENAI_API_KEY } = require('../config.json');

// Example user input with variables
const user_input = "Can you look up the temperature in New York?";
const location_variable = "New York";

// Configure OpenAI API client
const config = new Configuration({
  apiKey: OPENAI_API_KEY
});

const api = new OpenAIApi(config);
console.log(api)
// Set up the initial messages
const messages = [
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: user_input, variables: { location: location_variable } }
];

// Call the ChatGPT API
api.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages
  })
    .then(response => {
      const assistant_reply = response.choices[0].message.content;
      const assistant_variables = response.choices[0].message.role === 'assistant' ? response.choices[0].message.variables : {};
      const temperature = assistant_variables.temperature;
  
      console.log('Assistant:', assistant_reply);
      console.log('Temperature:', temperature);
    })
    .catch(err => {
      console.error('Error:', err);
    });
  