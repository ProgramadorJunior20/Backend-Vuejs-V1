require('dotenv').config()

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
const puerto = process.env.PORT;

/* import { dbConeccion } from '../database/conectando.db.js'; */

const app = express();

//conexion a DB
const mongoose = require('mongoose');

const uri = process.env.MONGODB_CNN;

const options = {useNewUrlParser: true}


// Or using promises
mongoose.connect(uri, options).then(
  /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
  () => { console.log('Conectado a DB') },
  /** handle initial connection error */
  err => { console.log(err) }
);

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api', require('./routes/nota'));
app.use('/api', require('./routes/user'));
app.use('/login', require('./routes/login'));

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', puerto || 3000);

app.listen(app.get('puerto'), () => {
  console.log('Example app listening on port: '+ app.get('puerto'));
});

