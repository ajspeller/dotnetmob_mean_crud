const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String
  },
  lastName: {
    type: String,
    required: true
  },
  dob: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  position: {
    type: String
  },
  office: {
    type: String
  },
  salary: {
    type: String
  }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = {
  Employee: Employee
};