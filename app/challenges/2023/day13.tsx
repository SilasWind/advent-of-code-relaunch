import React, { useState } from "react";
import InputComp from "../../inputComp";

function DayThirteen() {
  const [part2, setPart2] = useState(false);
  const [inputString, setInputString] = useState("");
  const [output, setOutput] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputString(e.target.value);
  };

  const doTheThing = () => {
    const mirrors = inputString.split("\n\n");
    let newOutput = 0;
    const findSplit = (mirrorArray: string[], prevResult?: number) => {
      for (let downIndex = 0; downIndex < mirrorArray.length - 1; downIndex++) {
        if (
          mirrorArray[downIndex].toString() ===
            mirrorArray[downIndex + 1].toString() &&
          (!prevResult || prevResult !== (downIndex + 1) * 100)
        ) {
          let counter = 3;
          let valid = true;
          for (let i = downIndex - 1; i > -1; i--) {
            if (mirrorArray[i + counter]) {
              if (
                mirrorArray[i].toString() !==
                mirrorArray[i + counter].toString()
              ) {
                valid = false;
                break;
              }
              counter = counter + 2;
            } else {
              break;
            }
          }
          if (valid) {
            return (downIndex + 1) * 100;
          }
        }
      }
      let previousCol: string[] = [];
      for (let sideIndex = 0; sideIndex < mirrorArray[0].length; sideIndex++) {
        let currentCol: string[] = [];
        mirrorArray.forEach((line) => {
          currentCol.push(line[sideIndex]);
        });
        if (
          currentCol.toString() === previousCol.toString() &&
          (!prevResult || prevResult !== sideIndex)
        ) {
          let counter = 3;
          let valid = true;
          for (let i = sideIndex - 2; i > -1; i--) {
            if (i < sideIndex - 4) {
            }
            if (mirrorArray[0][i + counter]) {
              if (
                mirrorArray.map((line) => line[i]).toString() !==
                mirrorArray.map((line) => line[i + counter]).toString()
              ) {
                valid = false;
                break;
              }
              counter = counter + 2;
            } else {
              break;
            }
          }
          if (valid) {
            return sideIndex;
          }
        }
        previousCol = [...currentCol];
      }
      return -1;
    };

    for (let mirrorIndex in mirrors) {
      const mirrorArray = mirrors[mirrorIndex].split("\n");
      if (part2) {
        const firstFind = findSplit(mirrorArray);
        let prevOutput = 0;
        for (let j = 0; j < mirrorArray.length; j++) {
          let found = false;
          for (let i = 0; i < mirrorArray[j].length; i++) {
            let newMirrorArray = [...mirrorArray];
            newMirrorArray.splice(
              j,
              1,
              mirrorArray[j]
                .split("")
                .toSpliced(i, 1, mirrorArray[j][i] === "#" ? "." : "#")
                .join("")
            );
            const result = findSplit([...newMirrorArray], firstFind);
            if (result > -1 && result !== firstFind) {
              newOutput += result;
              found = true;
              break;
            }
          }
          if (found) {
            break;
          }
        }
        prevOutput = newOutput;
      } else {
        newOutput += findSplit(mirrorArray);
      }
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
      dayNumber={13}
    />
  );
}

export default DayThirteen;
