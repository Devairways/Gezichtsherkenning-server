const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const registreer = require('./controller/registreer');
const login = require('./controller/login');
const profiel = require('./controller/profiel');
const img = require('./controller/pimage');

const database = knex({
	client:'pg',
	connection:{
		host:'127.0.0.1',
		user:'postgres',
		password:'DonkYkonG',
		database:'gezichtsherkenning'
	}
});

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{res.send(database.users)});
app.post('/login',(reg,res)=>{login.logHandler(req,res,bcrypt,database)});
app.post("/registreer", (req,res) => {registreer.regHandler(req,res,bcrypt,database)});
app.get('/gebruiker/:id', (req,res) => {profiel.profileHandler(req,res,database)});
app.put('/image',(req,res) => {img.imgHandler(req,res,database)});
app.post('/imageurl',(req,res) => {img.apiHandler(req,res)});

app.listen(3001, ()=>{
	console.log('De server draait');
});