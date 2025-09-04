import fs from "fs"
let data = fs.readFileSync("./input.txt", 'utf-8');

let arr = data.split("\n");
let left = [];
let right = {};
let result = 0;

arr.forEach(pairStr => {
  let value = pairStr.split(/\s+/)
  left.push(parseInt(value[0]))
  right[value[1]] ? right[value[1]] += 1 : right[value[1]] = 1
})

left.sort();

// for (let i = 0; i < left.length; i++) {
//   result += Math.abs(left[i] - right[i])
// }


for (let i = 0; i < left.length; i++) {
  let leftID = left[i]
  let rightOccurance = right[left[i]] || 0

  let score = leftID * rightOccurance

  result += score
}

console.log(result);
