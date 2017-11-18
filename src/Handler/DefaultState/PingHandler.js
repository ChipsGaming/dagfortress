module.exports = class{
  async process(message){
    return `Pong! ${message.author.id}`;
  }
};
