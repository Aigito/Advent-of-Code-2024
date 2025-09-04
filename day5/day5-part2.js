import fs from "fs";

// const sequenceRules = fs.readFileSync("./test-rules.txt", "utf-8").split("\n");
// const pageUpdates = fs.readFileSync("./test-updates.txt", "utf-8").split("\n").map(line => line.split(","));
const sequenceRules = fs.readFileSync("./input-rules.txt", "utf-8").split("\n");
const pageUpdates = fs.readFileSync("./input-updates.txt", "utf-8").split("\n").map(line => line.split(","));

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
        // console.log("ORDER IS: ", `${pageNumbers[i]}|${pageNumbers[j]}`);
        // console.log("BUT RULE IS: ", `${pageNumbers[j]}|${pageNumbers[i]}`);

        return {
          valid: false,
          originalOrder: `${pageNumbers[i]}|${pageNumbers[j]}`,
          violatedRule: `${pageNumbers[j]}|${pageNumbers[i]}`,
          correctedValues: {
            correctBeforeIndex: i,
            correctAfterIndex: j,
            correctBeforeValue: pageNumbers[j],
            correctAfterValue: pageNumbers[i]
          }
        };
      };
      j++;
    };
  };

  return { valid: true };
};


const getMiddlePageNumber = (pageNumbers) => {
  return Number(pageNumbers[(pageNumbers.length - 1) / 2]);
};

export const sort = ({ incorrectReport,
  correctedValues: {
    correctBeforeIndex,
    correctAfterIndex,
    correctBeforeValue,
    correctAfterValue
  }
}) => {
  const adjustedReport = [...incorrectReport];

  adjustedReport[correctBeforeIndex] = correctBeforeValue;
  adjustedReport[correctAfterIndex] = correctAfterValue;
  return adjustedReport;
};

let middlePagesFromCorrectReports = [];
let middlePagesFromAdjustedReports = [];

let result = pageUpdates.forEach((pageNumbers) => {
  let { valid, correctedValues } = validate(pageNumbers);
  // 1. validate report, if true on first go, save middle page number in Correct Reports array

  if (valid) {
    middlePagesFromCorrectReports.push(getMiddlePageNumber(pageNumbers));
  } else {
    // 2. if false, call sort
    while (!valid) {
      // 3. call validate on adjusted report, until report is valid
      let adjustedReport = sort({ incorrectReport: pageNumbers, correctedValues });
      ({ valid, correctedValues } = validate(adjustedReport));
      pageNumbers = adjustedReport;
    };
    // 4. Once valid, breaks out of while loop, grab middle page number
    middlePagesFromAdjustedReports.push(getMiddlePageNumber(pageNumbers));
  }
});

// 5. sum all middle pages from previously incorrect reports
// console.log(result.reduce((acc, curr) => acc + curr, 0));
// console.log("Middle Pages from ORIGINAL CORRECT REPORTS: ", middlePagesFromCorrectReports);
console.log("Sum: ", middlePagesFromCorrectReports.reduce((acc, curr) => acc + curr, 0));
// console.log("Middle Pages from ADJUSTED REPORTS: ", middlePagesFromAdjustedReports);
console.log("Sum: ", middlePagesFromAdjustedReports.reduce((acc, curr) => acc + curr, 0));