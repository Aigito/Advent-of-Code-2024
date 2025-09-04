import fs from "fs";
let data = fs.readFileSync("./test.txt", 'utf-8');

let reports = [];
let validReports = 0;

data.split(/\n/).forEach((line) => {
  let report = line.split(/\s+/).map(x => parseInt(x));
  reports.push(report)
})

const validateReport = (report) => {
  if (report.length < 2) return false; // too short to validate

  // use first two values to determine if increasing or decreasing
  const increasing = report[1] > report[0];

  for (let i = 0; i < report.length - 1; i++) {
    const curr = report[i];
    const next = report[i + 1];
    const diff = next - curr;

    // increasing: diffs must be between 1 and 3
    // decreasing: diffs must be between -3 and -1
    if (increasing) {
      if (diff < 1 || diff > 3) {
        return false;
      }
    } else {
      if (diff > -1 || diff < -3) {
        return false;
      }
    }
  }
  return true;
};

reports.forEach((report) => {
  if (validateReport(report)) validReports += 1;
});

// console.log(reports);
console.log(validReports);

// console.log(validateReport(["7", "6", "4", "2", "1"]))
// console.log(validateReport(["1", "2", "7", "8", "9"]))
// console.log(validateReport(["8", "6", "4", "4", "1"]))
// console.log(validateReport(["1", "3", "6", "7", "9"]))
// console.log(validateReport(['18', '20', '22', '25', '28', '31', '35']))
// console.log(validateReport(['33', '34', '38', '39', '40', '42']))
// console.log(validateReport(['26', '26', '27', '28', '31', '33', '34', '35']))