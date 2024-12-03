import React, { useState } from "react";
import InputComp from "../../inputComp";

function DayFive() {
  const [part2, setPart2] = useState(false);
  const [inputString, setInputString] = useState("");
  const [output, setOutput] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputString(e.target.value);
  };

  const extractArray = (regexIndex: number, match: string[]) => {
    const rows = match[regexIndex]?.split("\n").filter((row) => row);
    return rows?.map((row) => row.split(" ").map(Number));
  };

  const doTheThing = () => {
    const seedsRegex = inputString.match(/seeds:\s*([\d\s]+)/) ?? [];
    const match = inputString.match(/(?<=^|\n)[\d\s]+$/gm) ?? [];
    let seeds = seedsRegex[1]
      .replaceAll("\n", "")
      .split(" ")
      .map((seed) => {
        return parseInt(seed);
      });
    if (part2) {
      const seedGroups: number[][] = [];
      for (let i = 0; i < seeds.length; i += 2) {
        if (i + 1 < seeds.length) {
          seedGroups.push([seeds[i], seeds[i + 1]]);
        } else {
          seedGroups.push([seeds[i]]);
        }
      }
      // let lowestConversion = extractArray(6, match)[0];
      // extractArray(6, match).forEach((conversion) => {
      //   if (
      //     conversion[0] < lowestConversion[0]
      //   ) {
      //     lowestConversion = conversion;
      //   }
      // });
      // console.log(lowestConversion);
      const totalPossibleSeeds: number[][] = [];
      extractArray(6, match).forEach((lastConversion) => {
        let possibleConversions: number[][] = [];
        let lastPossibleConversions: number[][] = [lastConversion];
        for (let i = 5; i > -1; i--) {
          extractArray(i, match).forEach((conversion) => {
            lastPossibleConversions.forEach((possibleConversion) => {
              if (
                conversion[0] >= possibleConversion[1] &&
                conversion[0] <= possibleConversion[1] + possibleConversion[2]
              ) {
                possibleConversions.push(conversion);
              }
            });
          });
          lastPossibleConversions = [...possibleConversions];
        }
        const possibleSeeds: number[][] = [];
        console.log(possibleConversions);
        // seedGroups.forEach((group) => {
        //   if (
        //     group[0] >= lowestConversion[1] &&
        //     group[0] + group[1] <= lowestConversion[1] + lowestConversion[2]
        //   ) {
        //     possibleSeeds.push(group);
        //   }
        // });
        // if (possibleSeeds.length) {
        //   possibleSeeds.map((seed) => totalPossibleSeeds.push(seed));
        // }
      });
      console.log(totalPossibleSeeds);
    } else {
      let locations: number[] = [];
      seeds.forEach((seed) => {
        let newSeed = seed;
        for (let i = 0; i < 7; i++) {
          let changed = false;
          extractArray(i, match).forEach((conversion) => {
            if (
              newSeed <= conversion[1] + conversion[2] - 1 &&
              newSeed >= conversion[1] &&
              !changed
            ) {
              newSeed = conversion[0] + newSeed - conversion[1];
              changed = true;
            }
          });
        }
        locations.push(newSeed);
      });
      let smallestLocation = locations[0];
      locations.forEach((location) => {
        if (location < smallestLocation) {
          smallestLocation = location;
        }
      });
      setOutput(smallestLocation);
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
      dayNumber={5}
    />
  );
}

export default DayFive;
