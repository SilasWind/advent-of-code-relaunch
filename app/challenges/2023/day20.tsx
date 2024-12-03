import React, { useState } from "react";
import InputComp from "../../inputComp";

function DayTwenty() {
  const [part2, setPart2] = useState(false);
  const [inputString, setInputString] = useState("");
  const [output, setOutput] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputString(e.target.value);
  };

  const doTheThing = () => {
    const inputArray = inputString.split("\n");
    let flipFlops = new Set(); // only present if module is on
    let conjuncts: number[][] = [];
    let startingIndex = 0;
    let lowPulses = 1;
    let highPulses = 0;
    const repeats = 1;
    inputArray.forEach((line, index) => {
      if (line[0] === "&") {
        conjuncts.push([
          index,
          ...line
            .slice(line.indexOf(">") + 2)
            .split(",")
            .map(() => {
              return 0;
            }),
        ]);
      } else if (startingIndex === 0 && line.slice(0, 11) === "broadcaster") {
        startingIndex = index;
      }
    });
    for (let i = 0; i < repeats; i++) {
      const recursiveProp = (pulse: number, index: number) => {
        const currentLine = inputArray[index];
        console.log(currentLine);
        const destinations = currentLine
          .slice(currentLine.indexOf(">") + 2)
          .split(",")
          .map((item) => item.trim());
        destinations.forEach((dest, inputIndex) => {
          const currentType = inputArray[index][0];
          const destIndex = inputArray.findIndex(
            (line) => line.slice(1, line.indexOf(" ")) === dest
          );
          if (index === -1) {
            if (pulse) {
              highPulses++;
            } else {
              lowPulses++;
            }
          } else if (currentType === "%") {
            if (!pulse) {
              if (flipFlops.has(currentLine)) {
                flipFlops.delete(currentLine);
                lowPulses++;
                console.log(0 + " to " + dest);
                recursiveProp(0, destIndex);
              } else {
                flipFlops.add(currentLine);
                highPulses++;
                console.log(1 + " to " + dest);
                recursiveProp(1, destIndex);
              }
            }
          } else if (currentType === "&") {
            const conIndex = conjuncts.findIndex((con) => con[0] === index);
            if (pulse) {
              conjuncts[conIndex][inputIndex + 1] = 1;
            }
            let allHigh = true;
            conjuncts[conIndex].slice(1).forEach((val) => {
              if (!val) {
                allHigh = false;
              }
            });
            if (allHigh) {
              console.log(1 + " to " + dest);
              highPulses++;
              recursiveProp(1, destIndex);
            }
          } else {
            console.log(pulse + " to " + dest);
            recursiveProp(pulse, destIndex);
          }
        });
      };
      recursiveProp(0, startingIndex);
    }
    console.log("low: " + lowPulses + " high: " + highPulses);
    setOutput(lowPulses * highPulses);
  };
  return (
    <div>
      <InputComp
        part2={part2}
        setPart2={setPart2}
        inputString={inputString}
        output={output}
        part1Func={doTheThing}
        part2Func={doTheThing}
        handleChange={handleChange}
        dayNumber={20}
      />
      {/* <div>
        {holeOutput?.map((row, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              fontFamily: "monospace",
            }}
          >
            {row.map((char, charIndex) => (
              <div key={charIndex}>{char}</div>
            ))}
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default DayTwenty;
