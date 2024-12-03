import React, { useState } from "react";
import InputComp from "../../inputComp";

function DayOne() {
  const [part2, setPart2] = useState(false);
  const [inputString, setInputString] = useState("");
  const [output, setOutput] = useState(0);

  const numbers = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputString(e.target.value);
  };

  const doTheThing = () => {
    const inputArray = inputString.split(/\r?\n/);
    let output = 0;
    inputArray.forEach((el) => {
      const reversedString = el.split("").reverse().join("");
      let firstNumber = "";
      let lastNumber = "";
      let firstDigitIndex = el.search(/\d/);
      let firstDigit = el[firstDigitIndex];
      let lastDigitIndex =
        reversedString.search(/\d/) !== -1
          ? el.length - reversedString.search(/\d/) - 1
          : -1;
      let lastDigit = el[lastDigitIndex];
      let lowestWordFoundIndex = 100;
      let lowestWordFound = "";
      let highestWordFoundIndex = -100;
      let highestWordFound = "";
      if (!part2) {
        numbers.forEach((number) => {
          const index = el.indexOf(number);
          const lastIndex = el.lastIndexOf(number);
          if (index !== -1) {
            if (index < lowestWordFoundIndex) {
              lowestWordFoundIndex = index;
              lowestWordFound = number;
            }
            if (lastIndex > highestWordFoundIndex) {
              highestWordFoundIndex = lastIndex;
              highestWordFound = number;
            }
          }
        });
      }
      if (
        part2 ||
        (firstDigitIndex !== -1 && firstDigitIndex < lowestWordFoundIndex)
      ) {
        firstNumber = part2 && firstDigitIndex === -1 ? "0" : firstDigit;
      } else {
        firstNumber = numbers.indexOf(lowestWordFound).toString();
      }
      if (part2 || lastDigitIndex > highestWordFoundIndex) {
        lastNumber = part2 && lastDigitIndex === -1 ? "0" : lastDigit;
      } else {
        lastNumber = numbers.indexOf(highestWordFound).toString();
      }
      output = output + parseInt(firstNumber + lastNumber);
    });
    setOutput(output);
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
      dayNumber={1}
    />
  );
}

export default DayOne;
