"use strict";

const express = require('express');
const cors = require('cors');
const router = require('./controllers/router');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Use express body-parser to parse all request bodies.
app.use('/api/users', router);

app.get('/',
  (req, res) => res.send('Hello DASWorld! Sesión 21 Server activo.')
);
app.route('/home').get(
  (req, res) => res.send('DASWorld Home')
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
