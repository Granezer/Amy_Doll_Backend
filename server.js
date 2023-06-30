const express = require('express');
const mongoose = require('mongoose');
const Router = require('./src/router/Router');
const connectDB = require('./src/db/connect');
const notFound = require('./src/middleware/notfound');
const app = express();
const cors = require('cors');
require('dotenv').config();

// Connect to MongoDB
connectDB(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to the database');
    app.listen(8000, () => {
      console.log(`Server is listening on port ${8000}`);
    });
  })
  .catch((error) => {
    console.error('Could not connect to the database', error);
  });

app.use(
  cors()
);

app.use(express.json());
app.use('/api/v1/amy-doll', Router);
app.use('/uploads', express.static('uploads'));
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});
app.use(notFound);
