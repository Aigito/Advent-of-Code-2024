import fs from "fs";

const allRules = fs.readFileSync("./input-rules.txt", "utf-8").split("\n");
const allReports = fs.readFileSync("./input-updates.txt", "utf-8").split("\n").map(line => line.split(","));

const validate = (report, rules) => {
  let correctOnFirstGo = true;
  let adjustedReport = [...report]

  for (let i = 0; i < adjustedReport.length; i++) {
    for (let j = i + 1; j < adjustedReport.length; j++) {
      let rule = `${adjustedReport[j]}|${adjustedReport[i]}`;
      if (rules.includes(rule)) {
        [adjustedReport[i], adjustedReport[j]] = [adjustedReport[j], adjustedReport[i]];
        correctOnFirstGo = false;
      }
    };
  };

  return { adjustedReport, correctOnFirstGo };
};

const getMiddlePageNumber = (report) => {
  return Number(report[(report.length - 1) / 2]);
};

const run = (reports, rules) => {
  let middlePagesFromAdjustedReports = [];
  let middlePagesFromCorrectReports = [];

  reports.forEach((report) => {
    const { adjustedReport, correctOnFirstGo } = validate(report, rules);

    if (correctOnFirstGo) {
      middlePagesFromCorrectReports.push(getMiddlePageNumber(adjustedReport));
    } else {
      middlePagesFromAdjustedReports.push(getMiddlePageNumber(adjustedReport));
    }
  });

  return { middlePagesFromAdjustedReports, middlePagesFromCorrectReports };
};

let result = run(allReports, allRules);

console.log("Adjusted Reports: ", result.middlePagesFromAdjustedReports.reduce((acc, curr) => acc + curr, 0));
console.log("Correct Reports: ", result.middlePagesFromCorrectReports.reduce((acc, curr) => acc + curr, 0));