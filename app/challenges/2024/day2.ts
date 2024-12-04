export default function DayTwo(inputString: string) {
  const doTheThing = () => {
    const formattedInput = inputString.split("\n").map((x) => x.split(" "));
    let result = 0;
    formattedInput.forEach((report) => {
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
    return result;
  };

  const doTheThingPart2 = () => {
    const formattedInput = inputString.split("\n").map((x) => x.split(" "));
    let result = 0;
    formattedInput.forEach((report, index) => {
      if (isReportSafe(report, 0, index)) {
        result++;
      }
    });
    return result;
  };
  return { doTheThing, doTheThingPart2 };
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
