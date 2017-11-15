module.exports = class{
  process(message, next){
    message.reply(`
      ping - проверка соединения
      выйти - выйти из текущего мира (все достижения будут удалены)
    `);
  }
};
