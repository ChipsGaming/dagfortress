const Event = require('./Event');

module.exports = class{
  constructor(){
    this.events = [];
  }

  /**
   * Добавляет событие в журнал.
   *
   * @param {Event|String} event Добавляемое событие или его имя.
   * @param {Object} data Данные события.
   */
  trigger(event, data = {}){
    if(typeof event == 'string'){
      event = new Event(event, data);
    }

    this.events.push(event);
  }

  /**
   * Производит поиск событий с данным именем в журнале.
   *
   * @param {String[]} eventNames Имена искомых событий.
   *
   * @return {Event[]} События с задаными именами.
   */
  find(eventNames){
    return this.events.filter(
      (event) => eventNames.includes(event.name)
    );
  }
};
