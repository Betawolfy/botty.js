// actuellement, pour héberger notre bot, nous utilisons REPL.it, ce fichier permet de laisser le bot tourner 24h/24
const app = require('express')();

app.get('/', (req, res) => res.send('Server is up.'));

module.exports = () => {
  app.listen(3000);
}
