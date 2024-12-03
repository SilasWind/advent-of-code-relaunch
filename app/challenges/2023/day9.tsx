import React, { useState } from "react";
import InputComp from "../../inputComp";

function DayNine() {
  const [part2, setPart2] = useState(false);
  const [inputString, setInputString] = useState("");
  const [output, setOutput] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputString(e.target.value);
  };

  const doTheThing = () => {
    const inputArray = inputString.split(/\r?\n/).filter((el) => el);
    let newOutput = 0;
    inputArray.forEach((inputLine) => {
      let index = 0;
      let arrays: number[][] = [inputLine.split(" ").map((el) => parseInt(el))];
      while (true) {
        if (index === 5000) {
          console.error("infinite loop");
          break;
        }
        let onlyZeros = true;
        arrays[index].forEach((el) => {
          if (el !== 0) {
            onlyZeros = false;
          }
        });
        if (!onlyZeros) {
          for (let i = 0; i < arrays[index].length - 1; i++) {
            if (arrays[index + 1]) {
              arrays[index + 1].push(arrays[index][i + 1] - arrays[index][i]);
            } else {
              arrays.push([arrays[index][i + 1] - arrays[index][i]]);
            }
          }
          index++;
        } else {
          break;
        }
      }
      for (let i = arrays.length - 1; i >= 0; i--) {
        if (part2) {
          if (i === arrays.length - 1) {
            arrays[i].splice(0, 0, 0);
          } else {
            arrays[i].splice(0, 0, arrays[i][0] - arrays[i + 1][0]);
          }
        } else {
          if (i === arrays.length - 1) {
            arrays[i].push(0);
          } else {
            arrays[i].push(
              arrays[i][arrays[i].length - 1] +
                arrays[i + 1][arrays[i + 1].length - 1]
            );
          }
        }
      }
      newOutput += arrays[0][part2 ? 0 : arrays[0].length - 1];
    });
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
      dayNumber={9}
    />
  );
}

export default DayNine;
