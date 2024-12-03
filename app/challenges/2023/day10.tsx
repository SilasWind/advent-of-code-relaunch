import React, { useState } from "react";
import InputComp from "../../inputComp";

function DayTen() {
  const [part2, setPart2] = useState(false);
  const [inputString, setInputString] = useState("");
  const [output, setOutput] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputString(e.target.value);
  };

  const doTheThing = () => {
    let newOutput = 0;
    const inputArray = inputString.split(/\r?\n/).filter((el) => el);
    let startingCoords: [number, number] = [0, 0];
    const startingType = "J";
    inputArray.forEach((inputLine, yIndex) => {
      const xIndex = inputLine.indexOf("S");
      if (xIndex !== -1) {
        startingCoords = [yIndex, xIndex];
      }
    });
    let currentCoords: [number, number] = [...startingCoords];
    let previousCoords: [number, number] = [...startingCoords];
    let counter = 0;
    let loopCoords: number[][] = [[...startingCoords]];
    while (true) {
      const same: boolean =
        previousCoords.toString() === currentCoords.toString();
      let currentType =
        inputArray[currentCoords[0]][currentCoords[1]] === "S"
          ? startingType
          : inputArray[currentCoords[0]][currentCoords[1]];
      if (counter === 500000) {
        console.error("infinite loop");
        break;
      }
      let newPreviousCoords: [number, number] = [...currentCoords];
      if (currentType === "|") {
        if (previousCoords[0] < currentCoords[0] || same) {
          currentCoords[0] += 1;
        } else {
          currentCoords[0] -= 1;
        }
      } else if (currentType === "-") {
        if (previousCoords[1] < currentCoords[1] || same) {
          currentCoords[1] += 1;
        } else {
          currentCoords[1] -= 1;
        }
      } else if (currentType === "L") {
        if (previousCoords[0] < currentCoords[0] || same) {
          currentCoords[1] += 1;
        } else {
          currentCoords[0] -= 1;
        }
      } else if (currentType === "J") {
        if (previousCoords[1] < currentCoords[1] || same) {
          currentCoords[0] -= 1;
        } else {
          currentCoords[1] -= 1;
        }
      } else if (currentType === "7") {
        if (previousCoords[0] > currentCoords[0] || same) {
          currentCoords[1] -= 1;
        } else {
          currentCoords[0] += 1;
        }
      } else if (currentType === "F") {
        if (previousCoords[1] > currentCoords[1] || same) {
          currentCoords[0] += 1;
        } else {
          currentCoords[1] += 1;
        }
      } else {
        console.error("invalid type");
        break;
      }
      previousCoords = [...newPreviousCoords];
      if (part2) {
        loopCoords.push([...currentCoords]);
      }
      counter++;
      if (
        currentCoords[0] === startingCoords[0] &&
        currentCoords[1] === startingCoords[1]
      ) {
        break;
      }
    }
    newOutput = counter / 2;
    if (part2) {
      console.log(loopCoords);
      let insideLoop = false;
      let insideCounter = 0;
      let partOfLoop = false;
      inputArray.forEach((inputLine, yIndex) => {
        for (let xIndex = 0; xIndex < inputLine.length; xIndex++) {
          console.log(xIndex);
          loopCoords.forEach((loopCoord) => {
            if (loopCoord[0] === yIndex && loopCoord[1] === xIndex) {
              const type =
                inputArray[yIndex][xIndex] === "S"
                  ? startingType
                  : inputArray[yIndex][xIndex];
              if (type === "|") {
                insideLoop = !insideLoop;
              } else if (type === "F") {
                while (true) {
                  xIndex++;
                  if (inputArray[yIndex][xIndex] !== "-") {
                    break;
                  }
                }
                if (
                  inputArray[yIndex][xIndex] === "S"
                    ? startingType
                    : inputArray[yIndex][xIndex] === "J"
                ) {
                  insideLoop = !insideLoop;
                }
              } else if (type === "L") {
                while (true) {
                  xIndex++;
                  if (inputArray[yIndex][xIndex] !== "-") {
                    break;
                  }
                }
                if (
                  inputArray[yIndex][xIndex] === "S"
                    ? startingType
                    : inputArray[yIndex][xIndex] === "7"
                ) {
                  insideLoop = !insideLoop;
                }
              }
              partOfLoop = true;
            } else {
              partOfLoop = false;
            }
          });
          if (insideLoop && !partOfLoop) {
            insideCounter++;
          }
        }
      });
      newOutput = insideCounter;
    }

    setOutput(newOutput);
  };
  return (
    <InputComp
      part2={part2}
      setPart2={setPart2}
      inputString={inputString}
      output={output}
      part1Func={doTheThing}
      part2Func={doTheThing}
      handleChange={handleChange}
      dayNumber={10}
    />
  );
}

export default DayTen;
