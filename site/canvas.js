const express = require('express');
const app = express();
const port = 3000;

const jq = require('jquery');

module.exports = {
    name: 'canvas',
    run: async() => {

      app.get('/', (req, res) => res.sendFile('./index.html', { root : __dirname}));

      app.use(express.static("site"));

      app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
   }

}