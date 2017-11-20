module.exports = class{
  constructor(translations){
    this.translations = translations;
  }

  invoke(text, render){
    text = render(text);
    if(this.translations[text] === undefined){
      return text;
    }

    return this.translations[text];
  }
};
