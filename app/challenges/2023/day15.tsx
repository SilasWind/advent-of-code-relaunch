import React, { useState } from "react";
import InputComp from "../../inputComp";

function DayFifteen() {
  const [part2, setPart2] = useState(false);
  const [inputString, setInputString] = useState("");
  const [output, setOutput] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputString(e.target.value);
  };

  const doTheThing = () => {
    const inputArray = inputString.split(",").filter((el) => el);
    let newOutput = 0;
    let boxArray: string[][] = [];
    inputArray.forEach((input) => {
      if (part2) {
        const operatorIndex =
          input.indexOf("=") === -1 ? input.indexOf("-") : input.indexOf("=");
        const label = input.slice(0, operatorIndex);
        let currentValue = 0;
        for (let i = 0; i < label.length; i++) {
          currentValue += label[i].charCodeAt(0);
          currentValue = (currentValue * 17) % 256;
        }
        const boxIndex = currentValue;
        if (input[operatorIndex] === "=") {
          if (typeof boxArray[boxIndex] === "object") {
            let found = false;
            boxArray[boxIndex].forEach((lens, lensIndex) => {
              if (lens.slice(0, lens.search(/\d/)) === label) {
                boxArray[boxIndex].splice(
                  lensIndex,
                  1,
                  label + input[operatorIndex + 1]
                );
                found = true;
              }
            });
            if (!found) {
              boxArray[boxIndex].push(label + input[operatorIndex + 1]);
            }
          } else {
            boxArray[boxIndex] = [label + input[operatorIndex + 1]];
          }
        } else {
          if (typeof boxArray[boxIndex] === "object") {
            boxArray[boxIndex].forEach((lens, lensIndex) => {
              if (lens.slice(0, lens.search(/\d/)) === label) {
                boxArray[boxIndex].splice(lensIndex, 1);
              }
            });
          }
        }
      } else {
        let currentValue = 0;
        for (let i = 0; i < input.length; i++) {
          currentValue += input[i].charCodeAt(0);
          currentValue = (currentValue * 17) % 256;
        }
        newOutput += currentValue;
      }
    });
    if (part2) {
      boxArray.forEach((box, resBoxIndex) => {
        box.forEach((lens, resLensIndex) => {
          newOutput +=
            (resBoxIndex + 1) *
            (resLensIndex + 1) *
            parseInt(lens[lens.search(/\d/)]);
        });
      });
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
      dayNumber={15}
    />
  );
}

export default DayFifteen;
