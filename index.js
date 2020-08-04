const TelegramBot = require('node-telegram-bot-api');
const dialogFlow = require('./dialogFlow');
const youtube = require('./youtube');

const token = '1216502310:AAE_Es3LLKuhUx3hOz7sbDM_3LXDPXBOCUk';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async function(msg) {
  const chatId = msg.chat.id;
  console.log(msg.text);

  const dfResponse = await dialogFlow.sendMenssage(chatId.toString(), msg.text);
  let responseText = dfResponse.text;
  if (dfResponse.intent === 'Treino específico') {
    responseText = await youtube.searchVideoURL(responseText, dfResponse.fields.programacao.stringValue);
  }
  bot.sendMessage(chatId, responseText);
});