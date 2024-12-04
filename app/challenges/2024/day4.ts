export default function DayFour(inputString: string) {
  const doTheThing = () => {
    const input = inputString.split("\n").map((x) => x.split(""));
    let result = 0;
    input.forEach((row, rowIndex) => {
      const spaceTop = rowIndex > 2;
      const spaceBottom = rowIndex < input.length - 3;
      row.forEach((cell, cellIndex) => {
        if (cell === "X") {
          const spaceLeft = cellIndex > 2;
          const spaceRight = cellIndex < row.length - 3;
          if (spaceTop) {
            if (
              input[rowIndex - 1][cellIndex] === "M" &&
              input[rowIndex - 2][cellIndex] === "A" &&
              input[rowIndex - 3][cellIndex] === "S"
            ) {
              result++;
            }
            if (spaceLeft) {
              if (
                input[rowIndex - 1][cellIndex - 1] === "M" &&
                input[rowIndex - 2][cellIndex - 2] === "A" &&
                input[rowIndex - 3][cellIndex - 3] === "S"
              ) {
                result++;
              }
            }
            if (spaceRight) {
              if (
                input[rowIndex - 1][cellIndex + 1] === "M" &&
                input[rowIndex - 2][cellIndex + 2] === "A" &&
                input[rowIndex - 3][cellIndex + 3] === "S"
              ) {
                result++;
              }
            }
          }
          if (spaceRight) {
            if (
              input[rowIndex][cellIndex + 1] === "M" &&
              input[rowIndex][cellIndex + 2] === "A" &&
              input[rowIndex][cellIndex + 3] === "S"
            ) {
              result++;
            }
          }
          if (spaceBottom) {
            if (
              input[rowIndex + 1][cellIndex] === "M" &&
              input[rowIndex + 2][cellIndex] === "A" &&
              input[rowIndex + 3][cellIndex] === "S"
            ) {
              result++;
            }
            if (spaceRight) {
              if (
                input[rowIndex + 1][cellIndex + 1] === "M" &&
                input[rowIndex + 2][cellIndex + 2] === "A" &&
                input[rowIndex + 3][cellIndex + 3] === "S"
              ) {
                result++;
              }
            }
            if (spaceLeft) {
              if (
                input[rowIndex + 1][cellIndex - 1] === "M" &&
                input[rowIndex + 2][cellIndex - 2] === "A" &&
                input[rowIndex + 3][cellIndex - 3] === "S"
              ) {
                result++;
              }
            }
          }
          if (spaceLeft) {
            if (
              input[rowIndex][cellIndex - 1] === "M" &&
              input[rowIndex][cellIndex - 2] === "A" &&
              input[rowIndex][cellIndex - 3] === "S"
            ) {
              result++;
            }
          }
        }
      });
    });
    return result;
  };

  const doTheThingPart2 = () => {
    const input = inputString.split("\n").map((x) => x.split(""));
    let result = 0;
    input.forEach((row, rowIndex) => {
      const spaceTop = rowIndex > 0;
      const spaceBottom = rowIndex < input.length - 2;
      row.forEach((cell, cellIndex) => {
        const spaceLeft = cellIndex > 0;
        const spaceRight = cellIndex < row.length - 2;
        if (spaceTop && spaceBottom && spaceLeft && spaceRight) {
          if (cell === "A") {
            const topLeft = input[rowIndex - 1][cellIndex - 1];
            const topRight = input[rowIndex - 1][cellIndex + 1];
            const bottomLeft = input[rowIndex + 1][cellIndex - 1];
            const bottomRight = input[rowIndex + 1][cellIndex + 1];
            if (
              (topLeft === "M" && bottomRight === "S") ||
              (topLeft === "S" && bottomRight === "M")
            ) {
              if (
                (topRight === "M" && bottomLeft === "S") ||
                (topRight === "S" && bottomLeft === "M")
              ) {
                result++;
              }
            }
          }
        }
      });
    });
    return result;
  };
  return { doTheThing, doTheThingPart2 };
}
