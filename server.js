const express = require('express');
const bodyParser = require('body-parser');  
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// const db = knex({
//   client: 'pg',
//   connection: {
//     connectionString : process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false
//     },
//   }
// });
const db = knex({
  client: 'mysql',
  connection: {
    host : 'database-1-free-tier.cwpqdtdi9gdk.us-east-1.rds.amazonaws.com',
    port : 3306,
    user : 'admin',
    password : 'Password',
    database : 'smartbrain'
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.json('working') })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/update-image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(9000, ()=> {
  console.log(`app is running on port 9000`);
})
