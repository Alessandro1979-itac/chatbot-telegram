const dialogFlow = require('dialogflow');
const configs = require('./bot-carrefour.json');

const sessionClient = new dialogFlow.SessionsClient({
  project_id: configs.project_id,
  credentials: {
    private_key: configs.private_key,
    client_email: configs.client_email
  }
});

async function sendMenssage(chatId, message) {
  const sessionPath = sessionClient.sessionPath(configs.project_id, chatId);
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'pt-BR'
      }
    }
  }

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  return {
    text: result.fulfillmentText,
    intent: result.intent.displayName,
    fields: result.parameters.fields
  };
}

module.exports.sendMenssage = sendMenssage;