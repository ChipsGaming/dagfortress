const Event = require('./Event');

module.exports = class{
  constructor(){
    this.events = [];
  }

  // Getters
  /**
   * @param {Event} targetEvent Проверяемое событие.
   *
   * @return {Boolean} true - если событие уже зарегистрированно в журнале.
   */
  has(targetEvent){
    for(const event of this.events){
      if(event.id == targetEvent.id){
        return true
      }
    }

    return false;
  }

  /**
   * Производит поиск событий, удовлетворяющий условию.
   *
   * @param {Function} condition Условие поиска.
   *
   * @return {Event[]} События, удовлетворяющие условию.
   */
  find(condition){
    return this.events.filter(condition);
  }

  /**
   * Производит поиск событий с данным именем в журнале.
   *
   * @param {String[]} eventNames Имена искомых событий.
   *
   * @return {Event[]} События с задаными именами.
   */
  findByName(eventNames){
    return this.events.filter(
      (event) => eventNames.includes(event.name)
    );
  }

  /**
   * Производит поиск событий с данным источником в журнале.
   *
   * @param {Object} publisher Целевой источник событий.
   *
   * @return {Event[]} События с задаными источником.
   */
  findByPublisher(publisher){
    return this.events.filter(
      (event) => event.publisher == publisher
    );
  }

  // Actions
  /**
   * Добавляет событие в журнал.
   *
   * @param {Event|String} event Добавляемое событие или его имя.
   * @param {Object} publisher Источник события.
   * @param {Object} data Данные события.
   */
  trigger(event, publisher, data = {}){
    if(typeof event == 'string'){
      event = new Event(event, publisher, data);
    }
    if(this.has(event)){
      return;
    }

    this.events.push(event);
  }

  /**
   * Сливает в вызываемый журнал событий данные из заданного.
   *
   * @param {EventJournal} eventJournal Сливаемый журнал событий.
   *
   * @return {EventJournal} Вызываемый журнал событий.
   */
  merge(eventJournal){
    for(const event of eventJournal.events){
      this.trigger(event);
    }

    return this;
  }

  /**
   * Отчищает журнал.
   */
  clear(){
    this.events = [];
  }
};
