import fs from "fs";


let grid = fs.readFileSync("./input.txt", "utf-8").split("\n").map(x => x.split(""));;

// [
//   ['.', '.', '.', '.', 'X', 'X', 'M', 'A', 'S', '.'],
//   ['.', 'S', 'A', 'M', 'X', 'M', 'S', '.', '.', '.']
// ]

const word = "MASMAS";
const directions = [
  [
    [0, 0], //original position
    [1, 1], //down-right (relative from original position)
    [2, 2], //down-right-down-right (relative from original position)
    [2, 0], //double-down (relative from original position)
    [1, 1], //down-right (relative from original position)
    [0, 2] //double-right (relative from original position)
  ],
  [
    [0, 0], //original position
    [1, 1], //down-right (relative from original position)
    [2, 2], //down-right-down-right (relative from original position)
    [0, 2], //double-right (relative from original position)
    [1, 1], //down-right (relative from original position)
    [2, 0] //double-down (relative from original position)
  ],
  [
    [0, 0], //original position
    [-1, -1], //up-left (relative from original position)
    [-2, -2], //up-left-up-left (relative from original position)
    [0, -2], //double-left (relative from original position)
    [-1, -1], //up-left (relative from original position)
    [-2, 0] //double-up (relative from original position)
  ],
  [
    [0, 0], //original position
    [-1, -1], //up-left (relative from original position)
    [-2, -2], //up-left-up-left (relative from original position)
    [-2, 0], //double-up (relative from original position)
    [-1, -1], //up-left (relative from original position)
    [0, -2] //double-left (relative from original position)
  ],
];

const findWord = (grid, word) => {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  const search = (r, c, direction) => {
    for (let i = 0; i < word.length; i++) {
      const nr = r + direction[i][0]
      const nc = c + direction[i][1]
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || grid[nr][nc] !== word[i]) {
        return false;
      }
      // console.log(word[i])
    };
    return true;
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === word[0]) {
        for (const direction of directions) {
          if (search(r, c, direction)) {
            count++;
          }
        }
      }
    }
  };

  return count;
}

let result = findWord(grid, word);
console.log(result);