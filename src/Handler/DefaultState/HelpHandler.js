module.exports = class{
  process(message){
    message.reply(`
      ping - проверка соединения
      список - список созданных миров
      создать SEED - создать новый мир с заданным зерном
      войти ID - войти в существующий мир с заданым идентификатором
    `);
  }
};
