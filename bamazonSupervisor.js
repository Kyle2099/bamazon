//require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');
require('dotenv').config();
const cTable = require('console.table');
// console.log(process.env);
//create connection to db
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.password,
  database: "bamazonDB",
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
})

function runbamazon() {
  inquirer.prompt([{
    type: "list",
    name: "doThing",
    message: "What would you like to do?",
    choices: ["View Product Sales by Department", "Create New Department", "End Session"]
  }]).then(function(ans){
    switch(ans.doThing){
      case "View Product Sales by Department": vProductBYDept();
      break;
      case "Create New Department": createNDept();
      break;
      case "End Session": console.log('See ya!');
    }
  });
}

function vProductBYDept(){

  connection.query('SELECT * FROM Departments', function(err, res){
    if(err) throw err;
    console.log('>>Product Sales by Department<<');
    console.log('----------------')

    for(var i = 0; i<res.length;i++){
      console.log("Department ID: " + 
      res[i].DepartmentID + " | " + "Department Name: " + 
      res[i].DepartmentName + " | " + "Over Head Cost: " + 
      (res[i].OverHeadCosts).toFixed(2) + " | " + "Product Sales: " + 
      (res[i].TotalSales).toFixed(2) + " | " + "Total Profit: " + 
      (res[i].TotalSales - res[i].OverHeadCosts).toFixed(2));
      console.log('---------------')
    }
    runbamazon();
  })
}

  //create a new department
  function createNDept(){
    console.log('>>Creating New Department<<');
    
    inquirer.prompt([
    {
      type: "input",
      name: "deptName",
      message: "Department Name: "
    }, {
      type: "input",
      name: "overHeadCost",
      message: "Over Head Cost: ",
      default: 0,
      validate: function(val){
        if(item(val) === false){return true;}
        else{return false;}
      }
    }, {
      type: "input",
      name: "prodSales",
      message: "Product Sales: ",
      default: 0,
      validate: function(val){
        if(item(val) === false){return true;}
        else{return false;}
      }
    }
    ]).then(function(ans){
      connection.query('INSERT INTO Departments SET ?',{
        DepartmentName: ans.deptName,
        OverHeadCosts: ans.overHeadCost,
        TotalSales: ans.prodSales
      }, function(err, res){
        if(err) throw err;
        console.log('Another department was added.');
      })
      runbamazon();
    });
  }

  runbamazon();