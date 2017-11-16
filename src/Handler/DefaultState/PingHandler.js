module.exports = class{
  process(message){
    return `Pong! ${message.author.id}`;
  }
};
