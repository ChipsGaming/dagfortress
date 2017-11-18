const RouteHandler = require('./RouteHandler');
const NullRoute = require('../Router/NullRoute');
const RegexRoute = require('../Router/RegexRoute');
const QueueRoute = require('../Router/QueueRoute');

module.exports = class extends RouteHandler{
  getRouter(){
    return new QueueRoute([
      new RegexRoute(/^ping$/i, [], {
        middleware: 'DefaultState/PingHandler'
      }),
      new RegexRoute(/^help$/i, [], {
        middleware: 'DefaultState/HelpHandler'
      }),
      new RegexRoute(/^список$/i, [], {
        middleware: 'DefaultState/WorldListHandler'
      }),
      new RegexRoute(/^создать (\d+)$/i, ['seed'], {
        middleware: 'DefaultState/CreateWorldHandler'
      }),
      new RegexRoute(/^войти ([a-zа-я0-9- ]+)$/i, ['name'], {
        middleware: 'DefaultState/EnterWorldHandler'
      }),
      new NullRoute({
        middleware: 'NullHandler'
      })
    ]);
  }
};
