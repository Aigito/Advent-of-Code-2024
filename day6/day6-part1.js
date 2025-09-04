import fs from "fs";

// const map = fs.readFileSync("./test.txt", "utf-8").split("\n").map(line => line.split(""));
const map = fs.readFileSync("./input.txt", "utf-8").split("\n").map(line => line.split(""));

// function: locateStartPosition
// need to figure out the position of starting hex, looks like it is "^"

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

const locateCurrentPosition = (map) => {
  let coordinate;

  map.forEach((row, idx) => {
    let pos = row.indexOf("^");

    if (pos >= 0) {
      coordinate = [idx, pos];
      return;
    };
  });

  return coordinate;
};

const checkCellAhead = (currPosition, direction, map) => {
  let nextCell;
  let y = currPosition[0];
  let x = currPosition[1];

  switch (direction) {
    case "^":
      if (map[y - 1] === undefined) return undefined;
      nextCell = map[y - 1][x];
      break;
    case ">":
      nextCell = map[y][x + 1];
      break;
    case "v":
      if (map[y + 1] === undefined) return undefined;
      nextCell = map[y + 1][x];
      break;
    case "<":
      nextCell = map[y][x - 1];
      break;
  };

  return nextCell;
};

const run = (map) => {
  let currPosition = locateCurrentPosition(map);
  let direction = "^";

  while (true) {
    let nextCell = checkCellAhead(currPosition, direction, map);
    let [y, x] = currPosition;

    // if the next step causes guard to leave the area (outside the array),
    switch (nextCell) {
      case ".":
      case "x":
        map[currPosition[0]][currPosition[1]] = "x";
        switch (direction) {
          case "^":
            currPosition = [y - 1, x]
            break;
          case ">":
            currPosition = [y, x + 1]
            break;
          case "v":
            currPosition = [y + 1, x]
            break;
          case "<":
            currPosition = [y, x - 1]
            break;
        };
        break;
      case "#":
        switch (direction) {
          case "^":
            direction = ">";
            break;
          case ">":
            direction = "v";
            break;
          case "v":
            direction = "<";
            break;
          case "<":
            direction = "^";
            break;
        };
        break;
      case undefined:
        map[currPosition[0]][currPosition[1]] = "x";
        console.log(map.flat().filter(el => el === "x").length);
        return;
    };
  };
}

run(map);