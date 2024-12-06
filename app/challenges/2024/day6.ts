export default function DaySix(inputString: string) {
  const formattedInput = inputString.split("\n").map(e => e.split(""));
  const doTheThing = () => {
    let result: number[][] = [];
    let pos = [0, 0];
    for (let i = 0; i < formattedInput.length; i++) {
      const index = formattedInput[i].findIndex(e => e !== "." && e !== "#");
      if (index !== -1) {
        pos = [i, index];
        break;
      }
    }
    const guard = formattedInput[pos[0]][pos[1]];
    let direction =
      guard === "^"
        ? "up"
        : guard === ">"
        ? "right"
        : guard === "<"
        ? "left"
        : "down";
    let done = false;
    while (!done) {
      result.push(pos);
      if (direction === "up") {
        const nextPoint = formattedInput[pos[0] + 1][pos[1]];
        if (pos[0] === 0) {
          done = true;
          break;
        }
        if (nextPoint === ".") {
          pos[0]--;
        } else {
          direction = "right";
          pos[1]++;
        }
      } else if (direction === "right") {
        const nextPoint = formattedInput[pos[0]][pos[1] + 1];
        if (pos[1] === formattedInput[0].length - 1) {
          done = true;
          break;
        }
        if (nextPoint === ".") {
          pos[1]++;
        } else {
          direction = "down";
          pos[0]++;
        }
      } else if (direction === "down") {
        const nextPoint = formattedInput[pos[0] - 1][pos[1]];
        if (pos[0] === formattedInput.length - 1) {
          done = true;
          break;
        }
        if (nextPoint === ".") {
          pos[0]++;
        } else {
          direction = "left";
          pos[1]--;
        }
      } else {
        const nextPoint = formattedInput[pos[0]][pos[1] - 1];
        if (pos[1] === 0) {
          done = true;
          break;
        }
        if (nextPoint === ".") {
          pos[1]--;
        } else {
          direction = "up";
          pos[0]--;
        }
      }
    }

    return result;
  };

  const doTheThingPart2 = () => {
    let result = 0;
    return result;
  };

  return { doTheThing, doTheThingPart2 };
}
