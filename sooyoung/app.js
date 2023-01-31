require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const { appDataSource } = require('./models/dbEnvironment');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('short'));
app.use(routes);

// health check
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

const PORT = process.env.PORT;

const start = async () => {
  app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
  appDataSource
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Data Source initialization Error', err);
      appDataSource.destroy();
    });
};

start();
