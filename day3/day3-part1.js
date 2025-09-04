import fs from "fs";

const data = fs.readFileSync("./input.txt", "utf-8");

// let mulInstructions = [...data.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)].map(m => [m[1], m[2]]);

// const multiply = function (x, y) {
//   return x * y;
// }

// let sum = mulInstructions.reduce((acc, [x, y]) => acc + x * y, 0);

// console.log(sum);

let sum = [...data.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)]
  .reduce((acc, [, x, y]) => acc + x * y, 0);

console.log(sum)