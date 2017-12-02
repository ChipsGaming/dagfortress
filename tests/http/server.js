const express = require('express'),
  bodyParser = require('body-parser'),
  container = require('./../../src/container'),
  Game = require('./../../src/Game/Game');

const game = new Game(container);
const app = express();

app.use(bodyParser.json());
app.post('/submit', async (req, res) => {
  const message = req.body;
  message.reply = res.send.bind(res);
  
  game.onMessage(message)
});
app.use(express.static(__dirname + '/public'));

const port = process.argv[2] !== undefined? process.argv[2] : 8080;
app.listen(port, () => {
  console.log(`Listen ${port}`);
});
