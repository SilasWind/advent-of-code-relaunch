import React, { useState } from "react";
import InputComp from "../../inputComp";

function DayTwo() {
  const [part2, setPart2] = useState(false);
  const [inputString, setInputString] = useState("");
  const [output, setOutput] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputString(e.target.value);
  };

  const partOne = () => {
    const inputArray = inputString.split(/\r?\n/);
    const newPossibleGames: number[] = [];
    inputArray.forEach((el, index) => {
      const match = el.match(/:\s(.*)/)![1];
      const rounds = match.split("; ");
      let possible = true;
      for (let i = 0; i < rounds.length; i++) {
        const colors = rounds[i].split(", ");
        for (const color of colors) {
          if (
            (color.includes("blue") &&
              parseInt(color.replace(" blue", "")) > 14) ||
            (color.includes("green") &&
              parseInt(color.replace(" green", "")) > 13) ||
            (color.includes("red") && parseInt(color.replace(" red", "")) > 12)
          ) {
            possible = false;
            break;
          }
        }
      }
      if (possible) newPossibleGames.push(index + 1);
    });
    setOutput(
      newPossibleGames.reduce((acc, curr) => {
        return acc + curr;
      }, 0)
    );
  };

  const partTwo = () => {
    const inputArray = inputString.split(/\r?\n/);
    let powers: number[] = [];
    inputArray.forEach((el, index) => {
      const match = el.match(/:\s(.*)/)![1];
      const colors = match.split(/,\s|;\s/);
      let blue = 0;
      let green = 0;
      let red = 0;
      colors.forEach((color) => {
        if (
          color.includes("blue") &&
          parseInt(color.replace(" blue", "")) > blue
        ) {
          blue = parseInt(color.replace(" blue", ""));
        } else if (
          color.includes("green") &&
          parseInt(color.replace(" green", "")) > green
        ) {
          green = parseInt(color.replace(" green", ""));
        } else if (
          color.includes("red") &&
          parseInt(color.replace(" red", "")) > red
        ) {
          red = parseInt(color.replace(" red", ""));
        }
      });
      powers.push(blue * green * red);
    });
    setOutput(
      powers.reduce((acc, curr) => {
        return acc + curr;
      }, 0)
    );
  };

  return (
    <InputComp
      part2={part2}
      setPart2={setPart2}
      inputString={inputString}
      output={output}
      part1Func={partOne}
      part2Func={partTwo}
      handleChange={handleChange}
      dayNumber={2}
    />
  );
}

export default DayTwo;
