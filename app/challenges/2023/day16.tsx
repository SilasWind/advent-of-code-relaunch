import React, { useState } from "react";
import InputComp from "../../inputComp";

function DaySixteen() {
  const [part2, setPart2] = useState(false);
  const [inputString, setInputString] = useState("");
  const [output, setOutput] = useState(0);
  const [inputArray, setInputArray] = useState<string[]>([]);
  const [energized, setEnergized] = useState<number[][]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputString(e.target.value);
  };

  const doTheThing = () => {
    const newInputArray = inputString.split(/\r?\n/).filter((line) => line);
    setInputArray([...newInputArray]);
    let beams: number[][] = [[0, 0, 0, 0]];
    let counter = 0;
    let newEnergized: number[][] = [];
    const newEnergizedSet = new Set();
    let lastAddition = 0;
    const calculateBeams = () => {
      while (beams.length) {
        if (lastAddition + 20 < counter) {
          console.log("no more additions");
          break;
        }
        beams.forEach((beam, beamIndex) => {
          if (
            beam[0] > -1 &&
            beam[0] < newInputArray[0].length &&
            beam[1] > -1 &&
            beam[1] < newInputArray.length
          ) {
            if (!newEnergizedSet.has(`${beam[0]},${beam[1]}`)) {
              newEnergizedSet.add(`${beam[0]},${beam[1]}`);
              newEnergized.push([beam[0], beam[1]]);
              lastAddition = counter;
            }
            const char = newInputArray[beam[1]][beam[0]];
            const getDirection = () => {
              if (beam[3] > beam[1]) {
                return "up";
              }
              if (beam[3] < beam[1]) {
                return "down";
              }
              if (beam[2] > beam[0]) {
                return "left";
              } else {
                return "right";
              }
            };
            const direction = getDirection();
            const changes = {
              up: [beam[0], beam[1] - 1, beam[0], beam[1]],
              down: [beam[0], beam[1] + 1, beam[0], beam[1]],
              right: [beam[0] + 1, beam[1], beam[0], beam[1]],
              left: [beam[0] - 1, beam[1], beam[0], beam[1]],
            };
            if (char === ".") {
              beams[beamIndex] = [...changes[direction]];
            } else if (char === "/") {
              if (direction === "up") {
                beams[beamIndex] = [...changes.right];
              } else if (direction === "down") {
                beams[beamIndex] = [...changes.left];
              } else if (direction === "right") {
                beams[beamIndex] = [...changes.up];
              } else {
                beams[beamIndex] = [...changes.down];
              }
            } else if (char === "\\") {
              if (direction === "up") {
                beams[beamIndex] = [...changes.left];
              } else if (direction === "down") {
                beams[beamIndex] = [...changes.right];
              } else if (direction === "right") {
                beams[beamIndex] = [...changes.down];
              } else {
                beams[beamIndex] = [...changes.up];
              }
            } else if (char === "|") {
              if (direction === "up" || direction === "down") {
                beams[beamIndex] = changes[direction];
              } else {
                beams[beamIndex] = [...changes.down];
                beams.push([...changes.up]);
              }
            } else if (char === "-") {
              if (direction === "left" || direction === "right") {
                beams[beamIndex] = [...changes[direction]];
              } else {
                beams[beamIndex] = [...changes.right];
                beams.push([...changes.left]);
              }
            }
          } else {
            beams.splice(beamIndex, 1);
          }
        });
        counter++;
      }
    };
    if (part2) {
      console.log("emini");
    } else {
      calculateBeams();
    }
    setEnergized([...newEnergized]);
    setOutput(newEnergized.length);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <InputComp
        part2={part2}
        setPart2={setPart2}
        inputString={inputString}
        output={output}
        part1Func={doTheThing}
        part2Func={doTheThing}
        handleChange={handleChange}
        dayNumber={16}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {inputArray.map((line, lineIndex) => (
          <div
            style={{ display: "flex", flexDirection: "row" }}
            key={lineIndex}
          >
            {line.split("").map((char, charIndex) => (
              <div
                style={{
                  color: energized.some(
                    (beam) => beam[0] === charIndex && beam[1] === lineIndex
                  )
                    ? "#42A5F5"
                    : "#fff",
                  fontSize: "25px",
                  fontFamily: "monospace",
                }}
                key={charIndex}
              >
                {char}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DaySixteen;
