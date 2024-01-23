const inquirer = require('inquirer');
const mysql = require('mysql2');

const queries = require('./queries');

const MainQuestions = [{
    type: 'list',
    name: 'mainChoice',
    message: 'What would you like to do?',
    choices: [
        {
            name: 'View All Employees',
            value: 'vaEmployees'
        },
        {
            name: 'View All Departments',
            value: 'vaDepartments'
        },
        {
            name: 'View All Roles',
            value: 'vaRoles'
        },
        new inquirer.Separator(),
        {
            name: 'View Employees by Manager',
            value: 'vEmployeesManager'
        },
        {
            name: 'View Employees by Department',
            value: 'vEmployeesDepartment'
        },
        new inquirer.Separator(),
        {
            name: 'View Department Budget',
            value: 'vDepartmentBudget'
        },
        new inquirer.Separator(),
        {
            name: 'Add employee',
            value: 'aEmployee'
        },
        {
            name: 'Add Department',
            value: 'aDepartment'
        },
        {
            name: 'Add Role',
            value: 'aRole'
        },
        new inquirer.Separator(),
        {
            name: 'Update Employee Role',
            value: 'uEmployeeRole'
        },
        {
            name: 'Update Employee manager',
            value: 'uEmployeeManager'
        },
        new inquirer.Separator(),
        {
            name: 'Delete Employee',
            value: 'dEmployee'
        },
        {
            name: 'Delete Department',
            value: 'dDepartment'
        },
        {
            name: 'Delete Role',
            value: 'dRole'
        },
        new inquirer.Separator(),
    ]
}]

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "HowAboutNo251",
        database: "employee_db",
    },
    console.log(`Connected to the employee_db database.`)
);

const InvokeMain = function() {
    inquirer
    .prompt(MainQuestions)
    .then(async (response) => {
        switch (response.mainChoice) {
            case 'vaEmployees':
                await db.promise().query(queries.ViewAllEmployees)
                .then(([rows, fields]) => {
                    console.table(rows);
                });
                break;
            case 'vaDepartments':
                await db.promise().query(queries.ViewAllDepartments)
                .then(([rows, fields]) => {
                    console.table(rows);
                });
                break;
            case 'vaRoles':
                await db.promise().query(queries.ViewAllRoles)
                .then(([rows, fields]) => {
                    console.table(rows);
                });
                break;
            case 'vEmployeesManager':
                var [rows, fields] = await db.promise().query(queries.ViewByManagerPrompt);
                var prompt = [{
                    type: 'list',
                    name: 'managerChoice',
                    message: 'Select a Manager',
                    choices: []
                }];
                rows.forEach((row) => {
                    prompt[0].choices.push({
                        name: row.first_name + ' ' + row.last_name + ' - ' + row.title + ' - ' + row.department,
                        value: row.id
                    });
                });
                await inquirer.prompt(prompt)
                .then(async (response) => {
                    await db.promise().query(queries.ViewByManager, [response.managerChoice])
                    .then(([rows, fields]) => {
                        console.table(rows);
                    });
                });
                break;
            case 'vEmployeesDepartment':
                var [rows, fields] = await db.promise().query(queries.ViewAllDepartments);
                var prompt = [{
                    type: 'list',
                    name: 'departmentChoice',
                    message: 'Select a Department',
                    choices: []
                }];
                rows.forEach((row) => {
                    prompt[0].choices.push({
                        name: row.name,
                        value: row.id
                    });
                });
                await inquirer.prompt(prompt)
                .then(async (response) => {
                    await db.promise().query(queries.ViewByDepartment, [response.departmentChoice])
                    .then(([rows, fields]) => {
                        console.table(rows);
                    });
                });
                break;
