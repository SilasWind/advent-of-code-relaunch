import React, { useState } from "react";
import InputComp from "../../inputComp";

function DayEleven() {
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
      .map((el) => el.split(""));
    let emptyRows: number[] = [];
    let emptyCols: number[] = [...Array(inputArray[0].length).keys()];
    inputArray.forEach((inputLine, rowIndex) => {
      let currentRowEmpty = true;
      inputLine.forEach((el, columnIndex) => {
        if (inputLine[columnIndex] === "#") {
          currentRowEmpty = false;
          emptyCols = emptyCols.filter((el) => el !== columnIndex);
        }
      });
      if (currentRowEmpty) {
        emptyRows.push(rowIndex);
      }
    });
    emptyRows.forEach((rowIndex) => {
      inputArray.splice(rowIndex, 1, Array(inputArray[0].length).fill("M"));
    });
    emptyCols.forEach((colIndex) => {
      inputArray.forEach((row) => {
        row.splice(colIndex, 1, "M");
      });
    });
    let galaxies: number[][] = [];
    inputArray.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        if (column === "#") {
          galaxies.push([rowIndex, columnIndex]);
        }
      });
    });
    let totalDistances = 0;
    const multiplier = part2 ? 999999 : 1;
    galaxies.forEach((galaxy, galaxyIndex) => {
      galaxies.forEach((otherGalaxy, otherGalaxyIndex) => {
        if (galaxyIndex < otherGalaxyIndex) {
          emptyRows.forEach((row) => {
            if (
              row > Math.min(galaxy[0], otherGalaxy[0]) &&
              row < Math.max(galaxy[0], otherGalaxy[0])
            ) {
              totalDistances += multiplier;
            }
          });
          emptyCols.forEach((col) => {
            if (
              col > Math.min(galaxy[1], otherGalaxy[1]) &&
              col < Math.max(galaxy[1], otherGalaxy[1])
            ) {
              totalDistances += multiplier;
            }
          });
          totalDistances +=
            Math.abs(galaxy[0] - otherGalaxy[0]) +
            Math.abs(galaxy[1] - otherGalaxy[1]);
        }
      });
    });
    setOutput(totalDistances);
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
      dayNumber={11}
    />
  );
}

export default DayEleven;
