import fs from "fs";


let grid = fs.readFileSync("./test.txt", "utf-8").split("\n").map(x => x.split(""));;

// [
//   ['.', '.', '.', '.', 'X', 'X', 'M', 'A', 'S', '.'],
//   ['.', 'S', 'A', 'M', 'X', 'M', 'S', '.', '.', '.']
// ]

const word = "XMAS";
const directions = [
  [0, 1], //right
  [1, 1], //down-right
  [1, 0], //down
  [1, -1], //down-left
  [0, -1], //left
  [-1, -1], //up-left
  [-1, 0], //up
  [-1, 1] //up-right
];

const findWord = (grid, word) => {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  const search = (r, c, dr, dc) => {
    for (let i = 0; i < word.length; i++) {
      const nr = r + dr * i;
      const nc = c + dc * i;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || grid[nr][nc] !== word[i]) {
        return false
      }
    };
    return true;
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === word[0]) {
        for (const [dr, dc] of directions) {
          if (search(r, c, dr, dc)) {
            count++;
          }
        }
      }
    }
  };

  return count;
}

console.log(findWord(grid, word));