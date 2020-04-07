const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

start();

function start (){
    promptManager();
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employees = [] 

function promptManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "ID",
            message: "What is your ID number?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your e-mail?"
        }, 
        {
            type: "input",
            name: "office",
            message: "What is your office number?"
        }
    ]).then(managerAnswers => {
        let manager = new Manager(managerAnswers)
        employees.push(manager);
        nextEmployee();
      })

}

function nextEmployee(){
    inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Next teammate?",
            choices: ["Engineer", "Intern", "No one"]
        }
    ]).then(result => {
        if (result.employee === "Engineer"){
            promptEngineer();
        } if (result.employee === "Intern"){
            promptIntern();
        } if (result.employee === "No one"){
            fs.writeFile(outputPath, render(employees), function(err) {
                if (err) throw err;
                console.log("html created");
            });
        }
      })
}


function promptEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is their name?"
        },
        {
            type: "input",
            name: "ID",
            message: "What is their ID number?"
        },
        {
            type: "input",
            name: "email",
            message: "What is their e-mail?"
        }, 
        {
            type: "input",
            name: "github",
            message: "What is their GitHub username?"
        }
    ]).then(engineerAnswers => {
        let engineer = new Engineer(engineerAnswers)
        employees.push(engineer);
        nextEmployee();
      })
}

function promptIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is their name?"
        },
        {
            type: "input",
            name: "ID",
            message: "What is their ID number?"
        },
        {
            type: "input",
            name: "email",
            message: "What is their e-mail?"
        }, 
        {
            type: "input",
            name: "school",
            message: "What school are they attending?"
        }
    ]).then(internAnswers => {
        let intern = new Intern (internAnswers)
        // intern = Object.assign(internAnswers)
        employees.push(intern);
        nextEmployee();
      })
}


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```