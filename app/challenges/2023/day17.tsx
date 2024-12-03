import React, { useState } from "react";
import InputComp from "../../inputComp";

function DaySeventeen() {
  const [part2, setPart2] = useState(false);
  const [inputString, setInputString] = useState("");
  const [inputArray, setInputArray] = useState<number[][]>([]);
  const [output, setOutput] = useState(0);
  const [pathMatrix, setPathMatrix] = useState<boolean[][]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputString(e.target.value);
  };

  const doTheThing = () => {
    const newInputArray = inputString
      .trim()
      .split("\n")
      .map((row) => row.trim().split("").map(Number));
    setInputArray([...newInputArray]);
    const rows = newInputArray.length;
    const cols = newInputArray[0].length;
    const isValid = (r: number, c: number) =>
      r >= 0 && r < rows && c >= 0 && c < cols;
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    const queue = [[0, 0, -1, 0]];
    const distances = Array.from({ length: rows }, () =>
      Array(cols).fill(Infinity)
    );
    const newPathMatrix: boolean[][] = Array.from({ length: rows }, () =>
      Array(cols).fill(false)
    );
    const cameFrom = Array.from({ length: rows }, () => Array(cols).fill(null));
    newPathMatrix[0][0] = true;
    distances[0][0] = newInputArray[0][0];

    while (queue.length) {
      const [row, col, dirIndex, moveCount] = queue.shift() ?? [0, 0, 0, 0];
      const forbiddenDirs = [1, 0, 3, 2];
      for (let i = 0; i < directions.length; i++) {
        const dr = directions[i][0];
        const dc = directions[i][1];

        const newRow = row + dr;
        const newCol = col + dc;

        if (isValid(newRow, newCol)) {
          let newMoveCount = moveCount;
          if (i !== dirIndex) {
            newMoveCount = 1;
          } else {
            newMoveCount++;
          }
          const newDistance =
            distances[row][col] + newInputArray[newRow][newCol];
          if (
            newMoveCount <= 3 &&
            i !== forbiddenDirs[dirIndex] &&
            newDistance < distances[newRow][newCol]
          ) {
            distances[newRow][newCol] = newDistance;
            queue.push([newRow, newCol, i, newMoveCount]);
            cameFrom[newRow][newCol] = [row, col];
          }
        }
      }
    }
    let current = [rows - 1, cols - 1];
    while (current) {
      const [row, col] = current;
      newPathMatrix[row][col] = true;
      current = cameFrom[row][col];
    }
    setOutput(distances[rows - 1][cols - 1]);
    setPathMatrix([...newPathMatrix]);
    console.log(distances);
  };
  return (
    <div>
      <InputComp
        part2={part2}
        setPart2={setPart2}
        inputString={inputString}
        output={output}
        part1Func={doTheThing}
        part2Func={doTheThing}
        handleChange={handleChange}
        dayNumber={17}
      />
      <div>
        {inputArray?.map((row, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              fontFamily: "monospace",
            }}
          >
            {row.map((char, charIndex) => (
              <div
                key={charIndex}
                style={{
                  color: pathMatrix[index][charIndex] ? "#42A5F5" : "#fff",
                }}
              >
                {char}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DaySeventeen;
