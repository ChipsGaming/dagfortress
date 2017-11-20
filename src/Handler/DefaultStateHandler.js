const RouteHandler = require('./RouteHandler');
const NullRoute = require('../Router/NullRoute');
const RegexRoute = require('../Router/RegexRoute');
const QueueRoute = require('../Router/QueueRoute');

module.exports = class extends RouteHandler{
  getRouter(){
    return new QueueRoute([
      new RegexRoute(/^p(?:ing)?$/i, [], {
        middleware: 'DefaultState/PingHandler'
      }),
      new RegexRoute(/^h(?:elp)?$/i, [], {
        middleware: 'DefaultState/HelpHandler'
      }),
      new RegexRoute(/^с(?:писок)?$/i, [], {
        middleware: 'DefaultState/WorldListHandler'
      }),
      new RegexRoute(/^создать (\d+)$/i, ['seed'], {
        middleware: 'DefaultState/CreateWorldHandler'
      }),
      new RegexRoute(/^в(?:ойти)? ([a-zа-я0-9- ]+)$/i, ['name'], {
        middleware: 'DefaultState/EnterWorldHandler'
      }),
      new NullRoute({
        middleware: 'NullHandler'
      })
    ]);
  }
};
