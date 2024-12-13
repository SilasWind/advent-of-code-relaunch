export default function DayEight(inputString: string) {
  const formattedInput = inputString.split("\n").map(e => e.split(""));
  const doTheThing = () => {
    let result: number[][] = [];
    formattedInput.forEach((row, rowIndex) => {
      row.forEach((char, colIndex) => {
        if (char === ".") return;
        formattedInput.forEach((row2, rowIndex2) => {
          row2.forEach((char2, colIndex2) => {
            if (
              rowIndex !== rowIndex2 &&
              colIndex !== colIndex2 &&
              char === char2
            ) {
              const xDistance = rowIndex - rowIndex2;
              const yDistance = colIndex - colIndex2;
              const newPositions = [
                [rowIndex + xDistance, colIndex + yDistance],
                [rowIndex2 - xDistance, colIndex2 - yDistance],
              ];
              newPositions.forEach(pos => {
                if (pos[0] < 0 || pos[1] < 0) return;
                if (
                  pos[0] >= formattedInput.length ||
                  pos[1] >= formattedInput[0].length
                )
                  return;
                if (!result.some(r => r[0] === pos[0] && r[1] === pos[1])) {
                  result.push(pos);
                }
              });
            }
          });
        });
      });
    });
    return result.length;
  };

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const doTheThingPart2 = () => {
    let result: number[][] = [];
    formattedInput.forEach((row, rowIndex) => {
      row.forEach((char, colIndex) => {
        if (char === ".") return;
        formattedInput.forEach((row2, rowIndex2) => {
          row2.forEach((char2, colIndex2) => {
            if (
              rowIndex !== rowIndex2 &&
              colIndex !== colIndex2 &&
              char === char2
            ) {
              const xDistance = rowIndex - rowIndex2;
              const yDistance = colIndex - colIndex2;

              const commonDivisor = gcd(
                Math.abs(xDistance),
                Math.abs(yDistance)
              );

              const stepX = xDistance / commonDivisor;
              const stepY = yDistance / commonDivisor;

              let x = rowIndex2;
              let y = colIndex2;
              let x2 = rowIndex;
              let y2 = colIndex;
              while (
                x >= -1 &&
                y >= -1 &&
                x < formattedInput.length &&
                y < formattedInput[0].length
              ) {
                x += stepX;
                y += stepY;
                if (x < 0 || y < 0) return;
                if (x >= formattedInput.length || y >= formattedInput[0].length)
                  return;
                if (!result.some(r => r[0] === x && r[1] === y)) {
                  result.push([x, y]);
                }
              }
              while (
                x2 > 0 &&
                y2 > 0 &&
                x2 < formattedInput.length &&
                y2 < formattedInput[0].length
              ) {
                x2 -= stepX;
                y2 -= stepY;
                if (x2 < 0 || y2 < 0) return;
                if (
                  x2 >= formattedInput.length ||
                  y2 >= formattedInput[0].length
                )
                  return;
                if (!result.some(r => r[0] === x2 && r[1] === y2)) {
                  result.push([x2, y2]);
                }
              }
            }
          });
        });
      });
    });
    return result.length;
  };

  return { doTheThing, doTheThingPart2 };
}
