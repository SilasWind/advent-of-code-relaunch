import React, { useState } from "react";
import InputComp from "../../inputComp";

function DayFourteen() {
  const [part2, setPart2] = useState(false);
  const [inputString, setInputString] = useState("");
  const [output, setOutput] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputString(e.target.value);
  };

  const doTheThing = () => {
    const inputArray = inputString.split(/\r?\n/).map((line) => line.split(""));
    let couldMove = false;
    let counter = 0;
    let newOutput = 0;
    const tiltPlatform = (direction: string) => {
      do {
        couldMove = false;
        if (direction === "n" || direction === "s") {
          inputArray.forEach((line, index) => {
            if (direction === "n" ? index > 0 : index < inputArray.length - 1) {
              for (let i = 0; i < line.length; i++) {
                if (line[i] === "O") {
                  if (
                    inputArray[direction === "n" ? index - 1 : index + 1][i] ===
                    "."
                  ) {
                    line.splice(i, 1, ".");
                    inputArray[
                      direction === "n" ? index - 1 : index + 1
                    ].splice(i, 1, "O");
                    couldMove = true;
                  }
                }
              }
            }
          });
        } else {
          inputArray[0].forEach((col, colIndex) => {
            if (
              direction === "w"
                ? colIndex > 0
                : colIndex < inputArray[0].length - 1
            ) {
              for (let i = 0; i < inputArray.length; i++) {
                if (inputArray[i][colIndex] === "O") {
                  if (
                    inputArray[i][
                      direction === "w" ? colIndex - 1 : colIndex + 1
                    ] === "."
                  ) {
                    // console.log(`found ${i} ${colIndex}`);
                    if (direction === "w") {
                      inputArray[i].splice(colIndex - 1, 2, "O", ".");
                    } else {
                      inputArray[i].splice(colIndex, 2, ".", "O");
                    }

                    couldMove = true;
                  }
                }
              }
            }
          });
        }
        if (counter > 100000) {
          console.error("infinite loop");
          break;
        }
        counter++;
      } while (couldMove);
    };
    if (part2) {
      for (let i = 0; i < 160; i++) {
        tiltPlatform("n");
        tiltPlatform("w");
        tiltPlatform("s");
        tiltPlatform("e");
      }
    } else {
      tiltPlatform("n");
    }
    inputArray.forEach((line, index) => {
      line.forEach((char) => {
        if (char === "O") {
          newOutput += inputArray.length - index;
        }
      });
    });
    console.log(inputArray);
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
      dayNumber={14}
    />
  );
}

export default DayFourteen;
