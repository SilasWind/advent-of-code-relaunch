import React, { useState } from "react";
import InputComp from "../../inputComp";

function DayEight() {
  const [part2, setPart2] = useState(false);
  const [inputString, setInputString] = useState("");
  const [output, setOutput] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputString(e.target.value);
  };

  const doTheThing = () => {
    setOutput(0);
    const inputArray = inputString.split(/\r?\n/).filter((el) => el);
    const leftRight = inputArray[0];
    if (part2) {
      let searchIndices: number[] = [];
      inputArray.forEach((line, inputIndex) => {
        if (inputIndex > 0) {
          if (line.slice(2, 3) === "A") {
            searchIndices.push(inputIndex);
          }
        }
      });
      let counters: number[] = [];
      searchIndices.forEach((searchIndex) => {
        let counter = 1;
        let index = 0;
        while (true) {
          if (index === leftRight.length) {
            index = 0;
          }
          const destination = inputArray[searchIndex]
            .slice(
              inputArray[searchIndex].indexOf(
                leftRight[index] === "L" ? "(" : ","
              ) + 1,
              inputArray[searchIndex].indexOf(
                leftRight[index] === "L" ? "," : ")"
              )
            )
            .trim();
          searchIndex = inputArray.findIndex(
            (line) => line.slice(0, 3) === destination
          );
          if (destination[2] === "Z") {
            counters.push(counter);
            break;
          }
          counter++;
          index++;
        }
      });
      const gcd = (a: number, b: number): number => {
        if (b === 0) {
          return a;
        }
        return gcd(b, a % b);
      };
      const lcm = (a: number, b: number): number => {
        return (a * b) / gcd(a, b);
      };
      let result = 1;
      for (let i = 0; i < counters.length; i++) {
        result = lcm(result, counters[i]);
      }
      setOutput(result);
    } else {
      let counter = 1;
      let index = 0;
      let searchIndex = inputArray.findIndex(
        (line) => line.slice(0, 3) === "AAA"
      );
      while (true) {
        if (index === leftRight.length) {
          index = 0;
        }
        const destination = inputArray[searchIndex]
          .slice(
            inputArray[searchIndex].indexOf(
              leftRight[index] === "L" ? "(" : ","
            ) + 1,
            inputArray[searchIndex].indexOf(
              leftRight[index] === "L" ? "," : ")"
            )
          )
          .trim();
        searchIndex = inputArray.findIndex(
          (line) => line.slice(0, 3) === destination
        );
        if (destination === "ZZZ") {
          setOutput(counter);
          break;
        }
        if (counter > 50000) {
          console.error("infinite loop");
          break;
        }
        counter++;
        index++;
      }
    }
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
      dayNumber={8}
    />
  );
}

export default DayEight;
