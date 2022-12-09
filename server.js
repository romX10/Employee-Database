const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'company_db'
    }, console.log('Successfully connected to the company_db database.') 
);

function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: ['View all employees', 'Add Employee', 
                    'Update Employee Role', 'View All Roles', 
                    'Add Role', 'View All Departments', 
                    'Add Department', 'Quit']
        }

    ])
    .then ((answers) => {
        if (answers.mainMenu === 'View all employees') {
            db.query('SELECT * FROM employees', function (err, results){
                console.log(' ')
                console.table(results);
                console.log('--------------------------------');
            });
            init();
        } 

        else if (answers.mainMenu === 'Add Employee') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is the first name of this employee?'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "What is the last name of this employee?"
                },
                {
                    type: 'input',
                    name: 'role_id',
                    message: "What is this employee's role id?"
                },
                {
                    type: 'input',
                    name: 'manager_id',
                    message: "What is this employee's manager id if they have one?"
                }
            ])
            .then((answers) => {
                db.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('" 
                + answers.first_name + "', '" + answers.last_name + "', " + answers.role_id + ", " + answers.manager_id +")", 
                function (err, results){
                    console.log('Successfully added employee!');
                });
                init();
            })
        } 

        else if (answers.mainMenu === 'Update Employee Role') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'emp_id',
                    message: 'What is the id of this employee?'
                },
                {
                    type: 'input',
                    name: 'role_id',
                    message: "What is the new role_id of this employee?"
                }
            ])
            .then((answers) => {
                db.query("UPDATE employees SET role_id = " + answers.role_id + " WHERE id = " + answers.emp_id, 
                function (err, results){
                    console.log('Successfully updated employee!');
                });
                init();
            })
        } 

        else if (answers.mainMenu === 'View All Roles') {
            db.query('SELECT * FROM roles', function (err, results){
                console.log(' ')
                console.table(results);
                console.log('--------------------------------');
            });
            init();
        } 

        else if (answers.mainMenu === 'Add Role') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'role',
                    message: 'What is the name of this role?'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: "What is this role's salary?"
                },
                {
                    type: 'input',
                    name: 'dep_id',
                    message: "What is this role's department id?"
                }
            ])
            .then((answers) => {
                db.query("INSERT INTO roles (title, salary, department_id) VALUES ('" 
                + answers.role + "', " + answers.salary + ", " + answers.dep_id + ")", 
                function (err, results){
                    console.log('Successfully added role!')
                });
                init();
            })
        } 

        else if (answers.mainMenu === 'View All Departments') {
            db.query('SELECT * FROM department', function (err, results){
                console.log(' ')
                console.table(results);
                console.log('--------------------------------');
            });
            init();
        } 

        else if (answers.mainMenu === 'Add Department') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'department',
                    message: 'What is the name of this department?'
                }
            ])
            .then((answers) => {
                db.query("INSERT INTO department (department_name) VALUES ('" + answers.department + "')", function (err, results){
                    console.log('Successfully added department!');
                });
                init();
            })
        } 

        else {
            return;
        };
    })
};

init();
