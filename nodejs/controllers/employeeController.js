const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const {
  Employee
} = require('../models/Employee');

// => localhost:3000/employees
router.get('/', (req, res) => {
  Employee.find((err, employees) => {
    if (!err) {
      res
        .status(200)
        .send(employees)
    } else {
      res
        .status(500)
        .send('Error in retrieving employees : ' + JSON.stringify(err, undefined, 2))
      console.log('Error in retrieving employees : ' + JSON.stringify(err, undefined, 2));
    }
  });
});

// => localhost:3000/employees
router.post('/', (req, res) => {
  const emp = new Employee({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    email: req.body.email,
    phone: req.body.phone,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary
  });
  emp
    .save()
    .then((newEmployee) => res
      .status(201)
      .send({
        message: 'Successfully created the new employee'
      }))
    .catch(err => {
      console.log('Error saving new employee ' + JSON.stringify(err, undefined, 2));
      res
        .status()
        .send('Error saving new employee ' + JSON.stringify(err, undefined, 2));
    });
});

// => localhost:3000/employees/:id
router.get('/:id', (req, res) => {
  const employeeId = req.params.id;

  if (!ObjectId.isValid(employeeId)) {
    res
      .status(400)
      .send({
        message: 'The supplied Id is invalid.',
        id: employeeId
      });
    console.log({
      message: 'The supplied Id is invalid.',
      id: employeeId
    });
  } else {
    Employee.findById(employeeId, (err, employee) => {
      if (!err) {
        res
          .status(200)
          .send(employee);
      } else {
        res
          .status(500)
          .send('Error retrieving the specified employee ' + JSON.stringify(err, undefined, 2));
      }
    });
  }
});

router.put('/:id', (req, res) => {
  const employeeId = req.params.id;

  if (!ObjectId.isValid(employeeId)) {
    res
      .status(400)
      .send({
        message: 'The supplied Id is invalid.',
        id: employeeId
      });
    console.log({
      message: 'The supplied Id is invalid.',
      id: employeeId
    });
  } else {
    Employee.findByIdAndUpdate(employeeId, {
      $set: {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
      }
    }, {
      new: true
    }, (err, updatedEmployee) => {
      if (!err) {
        res
          .status(200)
          .send(updatedEmployee);
      } else {
        res
          .status(500)
          .send('Error retrieving the specified employee ' + JSON.stringify(err, undefined, 2));
      }
    });
  }
});

router.delete('/:id', (req, res) => {

  const employeeId = req.params.id;

  if (!ObjectId.isValid(employeeId)) {
    res
      .status(400)
      .send({
        message: 'The supplied Id is invalid.',
        id: employeeId
      });
    console.log({
      message: 'The supplied Id is invalid.',
      id: employeeId
    });
  } else {
    Employee.findByIdAndRemove(employeeId, (err, deletedEmployee) => {
      if (!err && deletedEmployee) {
        res
          .status(200)
          .send({
            message: 'Employee successfully deleted',
            status: true
          });
      } else {
        res
          .status(500)
          .send({
            err: JSON.stringify(err, undefined, 2),
            message: 'Error deleting the specified employee',
            status: false
          });
      }
    });
  }

});

module.exports = router;