import React, { useState } from "react";
import InputComp from "../../inputComp";

function DaySix() {
  const [part2, setPart2] = useState(false);
  const [inputString, setInputString] = useState("");
  const [output, setOutput] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputString(e.target.value);
  };

  const doTheThing = () => {
    const match =
      inputString.match(/Time:\s+([\d\s]+)Distance:\s+([\d\s]+)/) ?? [];
    const times = part2
      ? [parseInt(match[1]?.replaceAll(" ", ""))]
      : match[1]
          ?.split(" ")
          .filter((time) => time)
          .map((time) => parseInt(time.trim()));
    const distances = part2
      ? [parseInt(match[2]?.replaceAll(" ", ""))]
      : match[2]
          ?.split(" ")
          .filter((distance) => distance)
          .map((distance) => parseInt(distance.trim()));
    let foundDistances: number[] = new Array(distances.length).fill(0);
    times.forEach((time, index) => {
      for (let i = 0; i <= time; i++) {
        if (i * (time - i) > distances[index]) {
          foundDistances[index]++;
        }
      }
    });
    setOutput(foundDistances.reduce((a, b) => a * b, 1));
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
      dayNumber={6}
    />
  );
}

export default DaySix;
