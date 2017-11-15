module.exports = class{
  process(message, next){
    message.reply(`
      ping - проверка соединения
      создать мир SEED - создать новый мир с заданным зерном
    `);
  }
};
