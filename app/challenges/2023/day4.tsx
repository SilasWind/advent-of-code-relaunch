import React, { useState } from "react";
import InputComp from "../../inputComp";

function DayFour() {
  const [part2, setPart2] = useState(false);
  const [inputString, setInputString] = useState("");
  const [output, setOutput] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputString(e.target.value);
  };

  const doTheThing = () => {
    const inputArray = inputString.split(/\r?\n/);
    let newOutput = 0;
    let cardCopies = new Array(inputArray.length).fill(1);
    let totalCards = inputArray.length;
    inputArray.forEach((el, index) => {
      const match =
        el.match(/Card\s+\d+:\s+(\d+(?:\s+\d+)*)\s+\|\s+(\d+(?:\s+\d+)*)/) ??
        [];
      const ownNumbers = match[1]
        ?.split(" ")
        .filter((number) => number)
        .map((ownNumber) => {
          return ownNumber.trim();
        });
      const winningNumbers = match[2]
        ?.split(" ")
        .filter((number) => number)
        .map((ownNumber) => {
          return ownNumber.trim();
        });
      let score = 0;
      if (part2) {
        do {
          let currentIndex = index + 1;
          winningNumbers.forEach((winningNumber) => {
            ownNumbers.forEach((ownNumber) => {
              if (winningNumber === ownNumber) {
                cardCopies[currentIndex]++;
                currentIndex++;
                totalCards++;
              }
            });
          });
          if (cardCopies[index]) cardCopies[index]--;
        } while (cardCopies[index]);
      } else {
        winningNumbers.forEach((winningNumber) => {
          ownNumbers.forEach((ownNumber) => {
            if (winningNumber === ownNumber) {
              if (score === 0) {
                score = 1;
              } else {
                score = score * 2;
              }
            }
          });
        });
        newOutput = newOutput + score;
      }
    });
    setOutput(part2 ? totalCards : newOutput);
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
      dayNumber={4}
    />
  );
}

export default DayFour;
