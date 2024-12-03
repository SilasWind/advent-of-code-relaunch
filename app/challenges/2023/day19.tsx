import React, { useState } from "react";
import InputComp from "../../inputComp";

function DayNineteen() {
  const [part2, setPart2] = useState(false);
  const [inputString, setInputString] = useState("");
  const [output, setOutput] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputString(e.target.value);
  };

  const doTheThing = () => {
    const inputArray = inputString.split("\n\n").map((el) => el.split("\n"));
    const catArray = ["x", "m", "a", "s"];
    let newOutput = 0;
    inputArray[1].forEach((part) => {
      let done = false;
      let currentWF =
        inputArray[0].find((workflow) => workflow.slice(0, 2) === "in") ?? "";
      const partValues = part
        .split(",")
        .map((val) => parseInt(val.match(/\d/g)?.join("")!));
      let counter = 0;

      const forwardToWF = (instruction: string) => {
        const destination = instruction.slice(instruction.indexOf(":") + 1);
        if (destination === "A") {
          console.log("accepting");
          newOutput = newOutput + partValues.reduce((a, b) => a + b, 0);
          done = true;
          return "";
        } else if (destination === "R") {
          console.log("rejecting");
          done = true;
          return "";
        } else {
          return destination;
        }
      };

      while (true) {
        if (counter === 10000) {
          console.error("infinite loop");
          break;
        }
        const instructions = currentWF
          .slice(currentWF.indexOf("{") + 1, currentWF.indexOf("}"))
          .split(",");
        for (let i = 0; i < instructions.length; i++) {
          const operator = instructions[i][1];
          console.log(instructions[i]);
          if (operator === ">" || operator === "<") {
            if (
              operator === ">"
                ? partValues[catArray.indexOf(instructions[i][0])] >
                  parseInt(
                    instructions[i].slice(
                      instructions[i].indexOf(">") + 1,
                      instructions[i].indexOf(":")
                    )
                  )
                : partValues[catArray.indexOf(instructions[i][0])] <
                  parseInt(
                    instructions[i].slice(
                      instructions[i].indexOf("<") + 1,
                      instructions[i].indexOf(":")
                    )
                  )
            ) {
              const newDest = forwardToWF(instructions[i]);
              if (newDest) {
                console.log("check passed, moving to " + newDest);
                currentWF =
                  inputArray[0].find(
                    (workflow) =>
                      workflow.slice(0, newDest.length) === newDest &&
                      workflow.indexOf("{") === newDest.length
                  ) ?? "";
              }
              break;
            }
          } else {
            const newDest = forwardToWF(instructions[i]);
            console.log("check failed, moving to " + newDest);
            if (newDest) {
              currentWF =
                inputArray[0].find(
                  (workflow) =>
                    workflow.slice(0, newDest.length) === newDest &&
                    workflow.indexOf("{") === newDest.length
                ) ?? "";
              console.log(currentWF);
            }
            break;
          }
        }
        if (done) {
          break;
        }
        counter++;
      }
    });
    console.log("too high: 536228");
    setOutput(newOutput);
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
        dayNumber={19}
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

export default DayNineteen;
