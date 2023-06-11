// node modules
const inquirer = require("inquirer");
const fs = require("fs");
const generateTeam = require("./page-template");

// lib modules
const Engineer = require("../lib/Engineer.js");
const Intern = require("../lib/Intern.js");
const Manager = require("../lib/Manager.js");

// Array for answers to questions
const newStaffMemberData = [];

// Array object questions asked in CLI to user
const questions = async () => {
  const answers = await inquirer
    .prompt([
      {
        type: "input",
        message: "Employee name?",
        name: "name",
      },
      {
        type: "input",
        message: "ID number?",
        name: "id",
      },
      {
        type: "input",
        message: "Employee email?",
        name: "email",
      },
      {
        type: "list",
        message: "Employee role?",
        name: "role",
        choices: ["Engineer", "Intern", "Manager"],
      },
    ])


    
    //  console.log(answers);
      // if manager selected, answer these specific question
      if (answers.role === "Manager") {
        const managerAns = await inquirer
          .prompt([
            {
              type: "input",
              message: "Manager office number?",
              name: "officeNumber",
            },
          ])
          const newManager = new Manager(
            answers.name,
            answers.id,
            answers.email,
            managerAns.officeNumber
          );
          newStaffMemberData.push(newManager);
          
        // if engineer selected answer these set of questions
      } else if (answers.role === "Engineer") {
        const githubAns = await inquirer
          .prompt([
            {
              type: "input",
              message: "Employee GitHub user name?",
              name: "github",
            }
          ])
            const newEngineer = new Engineer(
              answers.name,
              answers.id,
              answers.email,
              githubAns.github
            );
            newStaffMemberData.push(newEngineer);
          
        // if intern selected answer these set of questions
      } else if (answers.role === "Intern") {
        const internAns = await inquirer
          .prompt([
            {
              type: "input",
              message: "What university?",
              name: "school",
            },
          ])
          
          const newIntern = new Intern(
            answers.name,
            answers.id,
            answers.email,
            internAns.school
          );
          newStaffMemberData.push(newIntern);          
      } 

}; //end of questions function

async function promptQuestions() {
  await questions()
    
  
  const addMemberAns = await inquirer
    .prompt([
      {
        name:'addMember',
        type: 'list',
        choices: ['Add a new member', 'Create team'],
        message: "What would you like to do next?"
      }
    ])

    if (addMemberAns.addMember === 'Add a new member') {
      return promptQuestions()
    }
    return createTeam();
}  

promptQuestions();

function createTeam () {
  console.log("new guy", newStaffMemberData)
  fs.writeFileSync(
    "../output/index.html",
    generateTeam(newStaffMemberData),
    "utf-8"
  );
}