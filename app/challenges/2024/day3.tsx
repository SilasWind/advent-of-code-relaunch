import React, { useState } from "react";
import InputComp from "../../inputComp";

export default function DayThree() {
  const [part2, setPart2] = useState(false);
  const [inputString, setInputString] = useState("");
  const [output, setOutput] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputString(e.target.value);
  };

  const doTheThing = () => {
    const regex = /mul\(\d+,\d+\)/g;
    const matches = inputString.match(regex);
    let result = 0;

    matches?.map((match) => {
      const [a, b] = match
        .replace("mul(", "")
        .replace(")", "")
        .split(",")
        .map((x) => parseInt(x));
      return (result += a * b);
    });
    setOutput(result);
  };

  const doTheThingPart2 = () => {
    const regex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;
    const matches = inputString.match(regex);
    let result = 0;
    let enabled = true;
    matches?.forEach((match) => {
      if (match === "do()") {
        enabled = true;
      } else if (match === "don't()") {
        enabled = false;
      } else {
        if (enabled) {
          mul(match, result);
        }
      }
    });
    setOutput(result);
  };
  return (
    <InputComp
      part2={part2}
      setPart2={setPart2}
      inputString={inputString}
      output={output}
      part1Func={doTheThing}
      part2Func={doTheThingPart2}
      handleChange={handleChange}
      dayNumber={3}
    />
  );
}

function mul(match: string, result: number) {
  const [a, b] = match
    .replace("mul(", "")
    .replace(")", "")
    .split(",")
    .map((x) => parseInt(x));
  return result + a * b;
}
