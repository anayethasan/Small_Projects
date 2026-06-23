// Question no 1
// let res = 30;
let res = Number(prompt("Enter your Result: "));
if(res >= 0 && res < 33)
    console.log("You are fail and recevied gol gol dim (F)");

else if (res >= 33 && res < 40)
    console.log("D");
else if(res >= 40 && res < 50)
    console.log("C");
else if(res >= 50 && res < 60)
    console.log("B");
else if(res >= 60 && res < 65)
    console.log("B+")
else if(res >= 65 && res < 70)
    console.log("A-");
else if(res >= 70 && res < 80)
    console.log("A");
else if(res >= 80 && res <= 100)
    console.log("A+");
else
    console.log("Invalid number you enter a wrong number");



// question no 2 in node.js prompt not working so i take input in readline 

let num = Number(prompt("Enter your value: "));
if(num % 2 == 0) console.log(`${num} this is Even number`);
else console.log(`${num} this is Odd number`);


const readline = require("readline");
const inpt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

inpt.question(("Enter your input: "), num => {
    num = Number(num);
    if(num % 2 == 0) console.log(`${num} this is Even number`);
    else console.log(`${num} this is Odd number`);
    inpt.close();
});

// question no 3
const sorting = (res) => {
    for(let i = 0; i < res.length; i++)
    {
        for(let j = 0; j < res.length - i; j++)
        {
            if(res[j] > res[j+1])
            {
                let temp = res[j];
                res[j] = res[j + 1];
                res[j + 1] = temp;
            }
        }
    }
    return res;
}
let ar = [20, 18, 1, 5, 3, 19, 15, 17, 4, 2, 16, 6, 8, 14, 13, 7, 12, 9, 10, 11];

const result = sorting(ar);
console.log(...result);

// question no 4
let num = Number(prompt("Enter your number: "));
if(num % 4 == 0)
{
    if(num % 100 == 0)
    {
        if(num % 400 == 0)
        {
            console.log(`${num} This is Leaf year`);
        }
        else
        {
            console.log(`${num} This is not Leaf year`);
        }
    }
    else 
    {
        console.log(`${num} This is Leap year`);
    }
}
else
{
    console.log(`${num} This is not Leaf year`);
}

// question no 5
let num = prompt("Enter your number: ");
let ar = num.split(",").map(Number);

let result = ar.filter(val => val % 3 === 0 && val % 5 === 0);
console.log(...result);

question no 6
const longestFriend = (ar) => {
    let ele = ar[0];
    for(let i = 0; i < ar.length; i++)
    {
        if(ar[i].length > ele.length)
        {
            ele = ar[i];
        }
    }
    return ele;
}
var friends = ["rahim", "karim", "abdul", "sadsd", "heroAlom"];
const res = longestFriend(friends);
console.log(res);

// question no 7
var numbers = [1, 2, 3, 3, 4, 4, 5, 6, 7, 8, 9, 10];
const unVal = numbers.filter((val, idx, next) => {
    return next.indexOf(val) === idx;
});
console.log(unVal);

// question 8

const monthlySavings = (salarys, cost) => {
    if(!Array.isArray(salarys) || Array.isArray(cost))
    {
        console.log("Invalid input");
        return;
    }

    let saving = 0;
    for(let i = 0; i < salarys.length; i++)
    {
        let ele = salarys[i];
        if(ele >= 3000)
        {
            let dis = ele * 20 / 100;
            saving += ele - dis;
        }
        else
        {
            saving += ele;
        }
    } 

    if((saving - cost) < 0)
    {
        console.log("earn more");
    }
    else
    {
        console.log(saving - cost);
    }
}

const salary = [900, 2700, 3400]
monthlySavings(salary, salary);
