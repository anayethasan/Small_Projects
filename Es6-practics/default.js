// function add (num1, num2){
//     if(num2 == undefined){
//         num2 = 0;
//     }
//     return num1 + num2;
// }
// console.log(add(15));

// another way \\

function add (num1, num2){
    num2 = num2 || 0;
    return num1 + num2;
}
// console.log(add(15));

// default function \\

function add (num1, num2 = 10){
    return num1 + num2;
}
console.log(add(15));