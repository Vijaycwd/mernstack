const mongoose = require('mongoose');
const express = require('express');

router = express.Router();

//import Model

let employeeSchema = require('../models/Employee');

//put endpoint 
//localhost:3000/create-employee
//post employee
router.route('/create-employee').post(function(req,res) {
    //put schema
    employeeSchema.create(req.body)
  .then(employees => res.json(employees))
  .catch(err => res.json(err))

})

//get employee list
router.route('/').get((req,res) =>{
  employeeSchema.find()
  .then(employees => res.json(employees))
  .catch(err => res.status(400).json("Erro: "+ err)) 
})

//Delete employee list
//loca:500/emp
router.route('/:id').delete(async (req, res) => {
  const employeeId = req.params.id;
  try {
    const deletedEmployee = await employeeSchema.findByIdAndDelete(employeeId);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the employee' });
  }
});

router.route('/:id').put(async (req, res) => {
  const employeeId = req.params.id;
  try {
    const employeeId = req.params.id;
    const employeeData = req.body;
    const updateEmployee = await employeeSchema.findByIdAndUpdate(employeeId, employeeData);
    console.log(updateEmployee);
    console.log(employeeId);
    console.log(employeeData);
    /*const deletedEmployee = await employeeSchema.findByIdAndUpdate(employeeId);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    */
    res.status(200).json({ message: 'Employee Update successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the employee' });
  }
});

//Reset Password

module.exports = router
