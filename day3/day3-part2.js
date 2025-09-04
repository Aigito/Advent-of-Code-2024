import fs from "fs";

const data = fs.readFileSync("./input.txt", "utf-8");
const regex = /mul\((\d{1,3},\d{1,3})\)|(don't)|(do)/g;

let mulInstructions = [...data.matchAll(regex)].map(m => [m[1] || m[2] || m[3]]);
let enabled = true;
let sum = 0;

const inputParser = (input) => {
  if (["don't", "do"].includes(input[0])) {
    enableSwitch(input[0])
  } else {
    multiply(input[0])
  }
}

const enableSwitch = function (instruction) {
  if (instruction == "don't") enabled = false
  if (instruction === "do") enabled = true
}

const multiply = function (input) {
  if (!enabled) return;
  const [x, y] = input.split(",");
  sum = sum + x * y;
}

mulInstructions.forEach((inst) => {
  inputParser(inst)
})

console.log(sum)
// let sum = mulInstructions.reduce((acc, [x, y]) => acc + x * y, 0);