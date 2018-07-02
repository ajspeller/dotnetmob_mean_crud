const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const {
  Employee
} = require('../models/Employee');

// => localhost:3000/employees
router.get('/', (req, res) => {
  Employee.find().then((employees) => {
    res
      .status(200)
      .send(employees)
    console.log(employees);
  }).catch(err => {
    res
      .status(500)
      .send('Error in retrieving employees : ' + JSON.stringify(err, undefined, 2));
    console.log('Error in retrieving employees : ' + JSON.stringify(err, undefined, 2));
  });
});

// => localhost:3000/employees
router.post('/', (req, res) => {
  const employee = new Employee({
    firstName: req.body.firstName,
    middleInitial: req.body.middleInitial,
    lastName: req.body.lastName,
    dob: req.body.dob,
    email: req.body.email,
    phone: req.body.phone,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary
  });
  employee
    .save()
    .then((createdEmployee) => {
      res
        .status(201)
        .send({
          message: 'Successfully created the new employee',
          employeeId: createdEmployee._id
        });
    })
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
    Employee.findById(employeeId).then(employee => {
      res
        .status(200)
        .send(employee);
    }).catch(err => {
      res
        .status(500)
        .send('Error retrieving the specified employee ' + JSON.stringify(err, undefined, 2));
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

    const employee = new Employee({
      _id: req.body.id,
      firstName: req.body.firstName,
      middleInitial: req.body.middleInitial,
      lastName: req.body.lastName,
      dob: req.body.dob,
      email: req.body.email,
      phone: req.body.phone,
      position: req.body.position,
      office: req.body.office,
      salary: req.body.salary
    });

    Employee.updateOne({
        _id: employeeId
      }, employee)
      .then((result => {
        console.log(result);
        res
          .status(200)
          .send({
            message: "Update Successful"
          });
      }))
      .catch(err => {
        res
          .status(500)
          .send('Error retrieving the specified employee ' + JSON.stringify(err, undefined, 2));
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