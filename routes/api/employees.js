const express = require('express');
const path = require('path');
const EmployeesController = require('../../controllers/EmployeesController');

const router = express.Router();


router.route('/')
    .get(EmployeesController.getAllEmployees)
    .post(EmployeesController.createNewEmployee)
    .put(EmployeesController.updateEmployee)
    .delete(EmployeesController.deleteEmployee);

    router.route('/:id')
        .get(EmployeesController.getEmployee);

module.exports = router;