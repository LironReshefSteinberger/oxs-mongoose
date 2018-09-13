const express = require('express')
// const mongoose = require('mongoose');

const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()
const http = require('http').Server(app);

const addTenantRoutes = require('./routes/TenantRoute')

app.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true 
}));

app.use(bodyParser.json());

app.use(express.static('../frontend/dist'));

app.get('/', (req, res) => res.send('oxs'))


addTenantRoutes(app)


const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`App listening on port ${port}!`)
});

