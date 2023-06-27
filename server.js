const express = require('express');
const mongoose = require('mongoose');
const Router = require('./src/router/Router');
const bodyParser = require('body-parser');
const connectDB = require('./src/db/connect')
const notFound = require('./src/middleware/notfound')
const app = express();
const cors = require('cors');
require('dotenv').config();

// const dbUrl = process.env.MONGO_URI

// mongoose.set('debug', false);
// mongoose.Promise = global.Promise;
// mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// db.on('error', (error) => {
//   console.error('Failed to connect to database....',error);
// });

// db.on('open', () => {
//   console.log('Database connected successfully!!!...');
// });
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "https://amydoll.onrender.com"],
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/uploads', express.static("uploads"));
app.use(notFound)

const port = process.env.PORT || 8000

const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
      .then(() => {
        console.log("Connected to the database");
        app.listen(port, () =>
          console.log(`Server is listening on port ${port} !!!`)
        );
      })
      .catch((error) => console.error("Could not connect to the database"));
  } catch (error) {
    console.log(error);
  }
};

startApp();

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.use('/api/v1/amy-doll', Router);
