const mongoose = require('mongoose');

const Employee = mongoose.model('Employee', {
  firstName: {
    type: String
  },
  middleName: {
    type: String
  },
  lastName: {
    type: String
  },
  dob: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
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

module.exports = {
  Employee: Employee
};