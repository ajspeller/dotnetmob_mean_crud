const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;

const {
  mongoose
} = require('./db');

const employeeController = require('./controllers/employeeController');

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200'
}));


app.use('/employees', employeeController);

app.listen(port, () => console.log(`Server started on port ${port} ...`));