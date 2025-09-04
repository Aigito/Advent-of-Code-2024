import fs from "fs";

const map = fs.readFileSync("./test.txt", "utf-8").split("\n").map(line => line.split(""));

// function: move
// if next move exceeds row / column, guard has exitted the map
// - targetRow >= row
// - targetCol >= col
// - targetRow < 0
// - targetCol < 0

// checks if ^, <, >, v
// ^: swaps [map[currRow][currCol], map[currRow - 1][currCol]] = [map[currRow - 1][currCol], "x"]
// v: swaps [map[currRow][currCol], map[currRow + 1][currCol]] = [map[currRow + 1][currCol], "x"]
// >: swaps [map[currRow][currCol], map[currRow][currCol + 1]] = [map[currRow][currCol + 1], "x"]
// <: swaps [map[currRow][currCol], map[currRow][currCol - 1]] = [map[currRow][currCol - 1], "x"]

// function: checks obstacle
// if target hex ==== #, rotate 90 degrees to the right
// ^ => >
// > => v
// v => <
// < => ^

// finally, count the number of "x"

// TODO: is there a way for this to exist only inside of run()?
const rows = map.length;
const cols = map[0].length;

const checkForExit = (currPosition) => {
  // TODO: needs to know current direction facing
  // this will determine if y + 1 (down), y - 1 (up), x + 1 (right), x - 1 (left)

  // TODO: needs to know current position somehow, to be passed as a variable?
  const currRow = currPosition[0];
  const currCol = currPosition[1];

  switch (direction) {
    case "^":
      break;
    case ">":
      break;
    case "v":
      break;
    case "<":
      break;
  }
};


const run = (map) => {

  // TODO: To change this to be dynamic
  const currPosition = [9, 9]

  // console.log(rows, cols);

  // if the next step causes guard to leave the area (outside the array), exit run()
  if (checkForExit(currPosition)) return;

  // if there is an obstacle ahead (#), turn to the right, then start from beginning
  if (checkForObstacle()) {
    rotate90DegreesRight();
  } else {
    // otherwise, move to the next hex
    moveStraight();
  };
};

run(map);