const express = require('express');
const bodyParser = require('body-parser');

const {
  mongoose
} = require('./db');

const employeeController = require('./controllers/employeeController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/employees', employeeController);

module.exports = app;

// app.listen(port, () => console.log(`Server started on port ${port} ...`));