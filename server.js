const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Router = require('./src/router/Router');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
require('dotenv').config();

const dbUrl = process.env.MONGO_URI

mongoose.set('debug', false);
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Failed to connect to database....',error);
});

db.on('open', () => {
  console.log('Database connected successfully!!!...');
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/amy-doll', Router);

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log('Server is running on port 8000 !!!');
});
