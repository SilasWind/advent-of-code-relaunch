import React, { useState } from "react";
import InputComp from "../../inputComp";

export default function DayTwo() {
  const [part2, setPart2] = useState(false);
  const [inputString, setInputString] = useState("");
  const [output, setOutput] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputString(e.target.value);
  };

  const doTheThing = () => {
    const formattedInput = inputString.split("\n").map((x) => x.split(" "));
    let result = 0;
    formattedInput.forEach((report, index) => {
      let failed = false;
      let increasing = true;
      for (let i = 0; i < report.length; i++) {
        const current = parseInt(report[i]);
        if (i === report.length - 1) {
          break;
        }
        const next = parseInt(report[i + 1]);
        if (Math.abs(current - next) > 3 || Math.abs(current - next) === 0) {
          failed = true;
          break;
        }
        if (i === 0) {
          if (current > next) {
            increasing = false;
          }
        } else {
          if (increasing && current > next) {
            failed = true;
            break;
          }
          if (!increasing && current < next) {
            failed = true;
            break;
          }
        }
      }
      if (!failed) {
        result++;
      }
    });
    setOutput(result);
  };

  const doTheThingPart2 = () => {
    const formattedInput = inputString.split("\n").map((x) => x.split(" "));
    let result = 0;
    formattedInput.forEach((report, index) => {
      if (isReportSafe(report, 0, index)) {
        result++;
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
      dayNumber={2}
    />
  );
}

function isReportSafe(report: string[], level: number, index: number) {
  let increasing = true;
  let failed = false;
  for (let i = 0; i < report.length; i++) {
    const current = parseInt(report[i]);
    if (i === report.length - 1) {
      break;
    }
    const next = parseInt(report[i + 1]);
    if (Math.abs(current - next) > 3 || Math.abs(current - next) === 0) {
      if (level === 1) {
        failed = true;
        break;
      } else {
        if (
          !isReportSafe(report.toSpliced(i, 1), 1, index) &&
          !isReportSafe(report.toSpliced(i + 1, 1), 1, index) &&
          !isReportSafe(report.toSpliced(0, 1), 1, index)
        ) {
          failed = true;
          break;
        }
      }
      break;
    }
    if (i === 0) {
      if (current > next) {
        increasing = false;
      }
    } else {
      if (increasing && current > next) {
        if (level === 1) {
          failed = true;
          break;
        } else {
          if (
            !isReportSafe(report.toSpliced(i, 1), 1, index) &&
            !isReportSafe(report.toSpliced(i + 1, 1), 1, index) &&
            !isReportSafe(report.toSpliced(0, 1), 1, index)
          ) {
            failed = true;
            break;
          }
        }
      }
      if (!increasing && current < next) {
        if (level === 1) {
          failed = true;
          break;
        } else {
          if (
            !isReportSafe(report.toSpliced(i, 1), 1, index) &&
            !isReportSafe(report.toSpliced(i + 1, 1), 1, index) &&
            !isReportSafe(report.toSpliced(0, 1), 1, index)
          ) {
            failed = true;
            break;
          }
        }
      }
    }
  }
  if (!failed) {
    if (level === 0) {
    }
    return true;
  } else {
    return false;
  }
}
