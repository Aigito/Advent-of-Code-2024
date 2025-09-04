import fs from "fs";

const sequenceRules = fs.readFileSync("./test-rules.txt", "utf-8").split("\n");
const pageUpdates = fs.readFileSync("./test-updates.txt", "utf-8").split("\n").map(line => line.split(","));
// const sequenceRules = fs.readFileSync("./input-rules.txt", "utf-8").split("\n");
// const pageUpdates = fs.readFileSync("./input-updates.txt", "utf-8").split("\n").map(line => line.split(","));

// ['47|53', '97|13', '97|61', '97|47', '75|29', '61|13', '75|53', '29|13', '97|29', '53|29', '61|53', '97|53', '61|29', '47|13', '75|47', '97|75', '47|61', '75|61', '47|29', '75|13', '53|13']

// 75,47,61,53,29 => true

// 75,97,47,61,53 => false (97|75)

export const validate = (pageNumbers) => {
  let maxChecks = (pageNumbers.length * (pageNumbers.length - 1)) / 2

  for (let i = 0; i < maxChecks; i++) {
    let j = i + 1;
    while (j < pageNumbers.length) {
      // if rule is violated i.e. wrong order, return false
      // eg. sequence is ..,75,97,...but rule says 97|75 => false
      if (sequenceRules.includes(`${pageNumbers[j]}|${pageNumbers[i]}`)) {
        console.log("ORDER IS: ", `${pageNumbers[i]}|${pageNumbers[j]}`);
        console.log("BUT RULE IS: ", `${pageNumbers[j]}|${pageNumbers[i]}`);
        return false;
      };
      j++;
    };
  };

  return true;
};

const getMiddlePageNumber = (pageNumbers) => {
  return Number(pageNumbers[(pageNumbers.length - 1) / 2]);
};

let result = pageUpdates.map((pageNumbers) => {
  return validate(pageNumbers) ? getMiddlePageNumber(pageNumbers) : 0;
});

console.log(result.reduce((acc, curr) => acc + curr, 0));
