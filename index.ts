#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let myBalance = 10000;
let myPin= 3456;
////atm name
console.log(chalk.blue("\n \tWelcome to Unzi-ATM\n \t"));

 let pinAnswer = await inquirer.prompt(
    {
        name:"pin",
        message:chalk.yellow("\nEnter your pin\n"),
        type:"number"
    }
)
if(pinAnswer.pin===myPin ){
    console.log(chalk.green("Correct pin code"));
  
  let operationAns = await inquirer.prompt(
        [
            {
                   name:"operation",
                   message: chalk.bgGreenBright("please select option"),
                   type:"list",
                   choices:["withdraw","checkbalance"]
            }
        ]
    ) 
if(operationAns.operation==="withdraw"){
    let withdrawAns= await inquirer.prompt([
        {
            name: "withdrawMethod",
            type:"list",
            message:chalk.bold("Select withdraw Method"),
            choices:["FastCash","Enter Amount"]
        }
    ])
    if(withdrawAns.withdrawMethod=="FastCash"){
       let FastCashAns=await inquirer.prompt([
        {
            name:"fastCash",
            type:"list",
            message:chalk.cyan("Select Amount"),
            choices:[1000,2000,5000,10000]
        }
       ]);
       if(FastCashAns.fastCash>myBalance){
console.log(chalk.red("Insufficient Balance"));
       }
       else{
        myBalance-=FastCashAns.fastCash
        console.log(chalk.green(`${FastCashAns.fastCash} withdraw Successfully!`));
        console.log(chalk.white(`Your remaining Balance is:${ myBalance}`));
       }
    
    }
     else if(withdrawAns.withdrawMethod=="Enter Amount"){
        let amountAns=await inquirer.prompt(
            [
                {
                   name:"amount",
                   message:chalk.underline("Enter your amount"),
                   type:"number"
                }
            ]
        );
        
        
        if (amountAns.amount>myBalance){
            console.log(chalk.red("Your balance is Unsufficient"));
        }
        else{
            myBalance-=amountAns.amount;
        console.log(`${amountAns.amount} Withdraw Successfully`);
        console.log(chalk.yellow(`Your remaining balance : ${myBalance}`));
        }
        
    }


}
else if(operationAns.operation==="checkbalance"){
    console.log(chalk.bold(`Your Account Balance is:${myBalance}`));
}
}
else{
    console.log(chalk.red("Your Pin is incorrect,Try Again"));
    
}

