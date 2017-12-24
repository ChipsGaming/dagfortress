module.exports = class{
  constructor(){
    this.updatedDynamics = new Map;
    this.updatedItems = new Map;
  }

  getDynamic(id, def){
    if(!this.updatedDynamics.has(id)){
      this.updatedDynamics.set(
        id,
        Object.assign({}, def)
      );
    }

    return this.updatedDynamics.get(id);
  }

  getItem(id, def){
    if(!this.updatedItems.has(id)){
      this.updatedItems.set(
        id,
        Object.assign({}, def)
      );
    }

    return this.updatedItems.get(id);
  }

  /**
   * Применяет зарегистрированные события для формирования нового состояния.
   *
   * @param {EventJournal} eventJournal Журнал применяемых событий.
   * @param {ViewModelList} view Используемое для вывода представление.
   */
  applyEvents(eventJournal, view){
    for(const event of eventJournal.events){
      event.apply(this, view, eventJournal);
    }
  }

  /**
   * Заменяет текущее состояние мира заданным.
   *
   * @param {DynamicRepository} dynamicRepository
   */
  async replaceCurrentState(
    dynamicRepository,
    itemRepository
  ){
    for(const [key, dynamic] of this.updatedDynamics){
      await dynamicRepository.save(dynamic);
    }
    for(const [key, item] of this.updatedItems){
      await itemRepository.save(item);
    }
  }
};
