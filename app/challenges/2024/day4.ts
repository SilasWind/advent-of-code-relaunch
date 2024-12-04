export default function DayFour(inputString: string) {
  const input = inputString.split("\n").map((x) => x.split(""));

  const checkDirection = (
    rowIndex: number,
    cellIndex: number,
    dRow: number,
    dCol: number
  ) => {
    return (
      input[rowIndex + dRow]?.[cellIndex + dCol] === "M" &&
      input[rowIndex + 2 * dRow]?.[cellIndex + 2 * dCol] === "A" &&
      input[rowIndex + 3 * dRow]?.[cellIndex + 3 * dCol] === "S"
    );
  };

  const doTheThing = () => {
    let result = 0;
    input.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell === "X") {
          if (checkDirection(rowIndex, cellIndex, -1, 0)) result++;
          if (checkDirection(rowIndex, cellIndex, -1, -1)) result++;
          if (checkDirection(rowIndex, cellIndex, -1, 1)) result++;
          if (checkDirection(rowIndex, cellIndex, 0, 1)) result++;
          if (checkDirection(rowIndex, cellIndex, 1, 0)) result++;
          if (checkDirection(rowIndex, cellIndex, 1, 1)) result++;
          if (checkDirection(rowIndex, cellIndex, 1, -1)) result++;
          if (checkDirection(rowIndex, cellIndex, 0, -1)) result++;
        }
      });
    });
    return result;
  };

  const doTheThingPart2 = () => {
    let result = 0;
    input.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (
          cell === "A" &&
          rowIndex > 0 &&
          rowIndex < input.length - 1 &&
          cellIndex > 0 &&
          cellIndex < row.length - 1
        ) {
          const topLeft = input[rowIndex - 1][cellIndex - 1];
          const topRight = input[rowIndex - 1][cellIndex + 1];
          const bottomLeft = input[rowIndex + 1][cellIndex - 1];
          const bottomRight = input[rowIndex + 1][cellIndex + 1];
          if (
            ((topLeft === "M" && bottomRight === "S") ||
              (topLeft === "S" && bottomRight === "M")) &&
            ((topRight === "M" && bottomLeft === "S") ||
              (topRight === "S" && bottomLeft === "M"))
          ) {
            result++;
          }
        }
      });
    });
    return result;
  };

  return { doTheThing, doTheThingPart2 };
}
