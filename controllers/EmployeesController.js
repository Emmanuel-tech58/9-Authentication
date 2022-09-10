const data = {
    employees: require('../model/employees.json'),
    setEmployee: function (data){this.employees = data}
}

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length -1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    if (!newEmployee.firstname || !newEmployee.lastname){
        return res.status(400).json({'message': 'first and last names are required.'})
    }
    data.setEmployee([...data.employees, newEmployee]);
    res.status(201).json(data.employees)
    console.log(data.employees);
}

const updateEmployee = (req, res) => {
    const employee = data.employees.filter(emp => emp.id === parseInt(req.body.id))[0];
    console.log(employee);
    if(!employee){
        return res.status(400).json({'message': `Employee ID ${req.body.id} Not Found`});
    }
    if(req.body.firstname) employee.firstname = req.body.firstname
    if(req.body.lastname) employee.lastname = req.body.lastname
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id))
    const unsortedArray = [...filteredArray, employee];
    data.setEmployee(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1: 0));
    res.status(200).json(data.employees);
}

const deleteEmployee = (req, res) =>{
    const employee = data.employees.filter(emp => emp.id === parseInt(req.body.id))[0];
    console.log(employee);
    if(!employee){
        return res.status(400).json({'message': `Employee ID ${req.body.id} Not Found`});
    }
    if(req.body.firstname) employee.firstname = req.body.firstname
    if(req.body.lastname) employee.lastname = req.body.lastname
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id))
    data.setEmployee([...filteredArray]);
    res.status(200).json(data.employees);
}

const getEmployee = (req, res) => {
    const employee = data.employees.filter(emp => emp.id === parseInt(req.params.id))[0];
    console.log(employee);
    if(!employee){
        return res.status(400).json({'message': `Employee ID ${req.body.id} Not Found`});
    }
    res.status(200).json(employee);
    // const employee = data.employees.filter(emp => emp.firstname === req.body.id || emp.lastname === req.body.lastname);
    // var found = [];
    // if(employee.length === 0){
    //     return res.status(400).json({'message': `Employee ID ${req.body.id} Not Found`});
    // }
    // for(var i = 0; i < employee.length; i++){
    //     found = [...found, employee[i]];
    // }
    // res.status(200).json(found);
}

module.exports = {getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee};