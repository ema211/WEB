"use strict";

process.env.TOKEN_KEY = process.env.TOKEN_KEY || "Welcome1234";

const express = require('express');
const router = require('./controllers/router');
const loginRouter = require('./controllers/login_router');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-auth', 'Authorization']
}));

app.use(express.json());
app.use(loginRouter);
app.use('/api/users', router);

app.get('/',
  (req, res) => res.send('Hello DASWorld!')
);
app.route('/home').get(
  (req, res) => res.send('DASWorld Home')
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
