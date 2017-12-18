module.exports = class{
  async build(options, container){
    const ai = {};
    for(const method of [
      'getTarget',
      'getTargetOrgan',
      'getWeapon',
      'getDamage',
      'getCurrentTask',
      'getNextLocation'
    ]){
      const handler = await require(options.ai[method]).factory(options, container);
      ai[method] = handler.process.bind(handler);
    }

    return ai;
  }
};
