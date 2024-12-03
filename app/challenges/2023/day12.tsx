import React, { useState } from "react";
import InputComp from "../../inputComp";

function DayTwelve() {
  const [part2, setPart2] = useState(false);
  const [inputString, setInputString] = useState("");
  const [output, setOutput] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputString(e.target.value);
  };

  const doTheThing = () => {
    const inputArray = inputString
      .split(/\r?\n/)
      .filter((el) => el)
      .map((el) =>
        el
          .split(" ")
          .map((el, index) => (index === 0 ? el.split("") : el.split(",")))
      );
    let combinationAmount = 0;
    inputArray.forEach((el) => {
      if (part2) {
        for (let i = 0; i < 5; i++) {
          el[0] = [...el[0], ...el[0]];
          if (i !== 4) {
            el[0].push("?");
          }
          el[1] = [...el[1], ...el[1]];
        }
      }
      let possibleCombinations: string[] = [];
      function generateCombinations(s: string[], index: number): void {
        if (index === s.length) {
          possibleCombinations.push(s.join(""));
          return;
        }
        if (s[index] === "?") {
          s[index] = ".";
          generateCombinations(s, index + 1);
          s[index] = "#";
          generateCombinations(s, index + 1);
          s[index] = "?";
        } else {
          generateCombinations(s, index + 1);
        }
      }
      generateCombinations(el[0], 0);
      possibleCombinations.forEach((combination) => {
        let damageCluster: number[] = [];
        let currentIndex = 0;
        for (let i = 0; i < combination.length; i++) {
          if (combination[i] === "#") {
            if (!damageCluster[currentIndex]) {
              damageCluster[currentIndex] = 1;
            } else {
              damageCluster[currentIndex]++;
            }
            if (combination[i + 1] !== "#") {
              currentIndex++;
            }
          }
        }
        if (damageCluster.toString() === el[1].toString()) {
          combinationAmount++;
        }
      });
    });
    setOutput(combinationAmount);
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
      dayNumber={12}
    />
  );
}

export default DayTwelve;
