const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./Controllers/register.js');
const signin = require('./Controllers/signin.js');
const profile = require('./Controllers/profile.js');
const image = require('./Controllers/image.js');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : ' ',
    database : 'smartbrain'
  }
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json('Hello');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleAPICall(req, res) })

app.listen(3000, () => {
  console.log('App is running on port 3000');
});

/*
/ --> res = this is working
/signin --> POST = sucess or fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = updated user

*/
