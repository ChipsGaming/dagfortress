module.exports = class{
  process(message){
    message.reply(`Pong! ${message.author.id}`);
  }
};
