module.exports = class{
  constructor(query, alias, parent = null){
    this.query = query;
    this.alias = alias;
    this.parent = parent;
  }

  build(){
    return this.query;
  }
};
