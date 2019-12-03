const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let employees = [
    {id: 0, firstName: 'Frodo', lastName: 'Baggins', description: 'ring bearer'},
    {id: 1, firstName: 'Bilbo', lastName: 'Baggins', description: 'burglar'},
    {id: 2, firstName: 'Gandalf', lastName: 'the Grey', description: 'wizard'},
    {id: 3, firstName: 'Samwise', lastName: 'Gamgee', description: 'gardener'},
    {id: 4, firstName: 'Mariadoc', lastName: 'Bandybuck', description: 'pony rider'},
    {id: 5, firstName: 'Peregrin', lastName: 'Took', description: 'pipe smoker'},
];

app.get('/api/employees', function (req, res) {
    res.json(employees);
});

app.post('/api/employees', function (req, res) {
    const employee = req.body;
    console.log('New employee=', employee);
    employees.push(employee);
    res.send(employee);
});

app.get('/api/employees/:id', function (req, res) {
    const employeeId = parseInt(req.params.id);
    console.log('Update employee=', employeeId);

    const idx = employees.findIndex((e) => e.id === employeeId);
    if (idx < 0) {
        res.status(404);
        return;
    }

    res.send(employees[idx]);
});

app.put('/api/employees/:id', function (req, res) {
    const employee = req.body;
    const employeeId = parseInt(req.params.id);
    console.log('Update employee=', employeeId);

    const idx = employees.findIndex((e) => e.id === employeeId);
    if (idx < 0) {
        res.status(404);
        return;
    }

    const newEmployees = [...employees];
    newEmployees[idx] = employee;
    employees = newEmployees;
    res.send(employee);
});

app.delete('/api/employees/:id', function (req, res) {
    const employeeId = parseInt(req.params.id);
    console.log('Delete employee=', employeeId);

    const idx = employees.findIndex((e) => e.id === employeeId);
    if (idx < 0) {
        res.status(404);
        return;
    }

    const newEmployees = [...employees];
    newEmployees.splice(idx, 1);
    employees = newEmployees;
    res.sendStatus(200);
});

app.listen(9080, function () {
    console.log('Example app listening on port 9080 !')
});

