const express = require("express");
const bodyParser = require("body-Parser");
const users = require('./users.json');
const sessions = require('./sessions.json');
const usersOld = require('./users.json');
const sessionsOld = require('./sessions.json');

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.get('/', (req, res) => {
 res.json({ users })
})

app.listen(3000, () => {
 console.log('sersvet started')
})
