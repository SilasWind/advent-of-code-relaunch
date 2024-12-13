import lodashCloneDeep from "lodash/cloneDeep";

export default function DaySix(inputString: string) {
  const _formattedInput = inputString.split("\n").map(e => e.split(""));
  const doTheThing = () => {
    return (moveGuard() as number[][]).length;
  };

  const doTheThingPart2 = () => {
    let result: number[][] = [];
    const possiblePositions = moveGuard() as number[][];
    possiblePositions.forEach(([x, y], index) => {
      console.log(`${index + 1}/${possiblePositions.length}`);

      if (_formattedInput[x][y] === ".") {
        let newInput = lodashCloneDeep(_formattedInput);
        newInput[x][y] = "#";
        if (moveGuard(newInput, true) === false) {
          result.push([x, y]);
        }
      }
    });
    return result.length;
  };

  // up: 0, right: 1, down: 2, left: 3

  function moveGuard(
    formattedInput: string[][] = _formattedInput,
    part2?: boolean
  ) {
    const result: number[][] = [];
    let pos = [0, 0, 0];
    const visited = new Set<string>(); // Track visited positions and directions
    for (let i = 0; i < formattedInput.length; i++) {
      const index = formattedInput[i].findIndex(e => e !== "." && e !== "#");
      if (index !== -1) {
        pos = [i, index, 0];
        break;
      }
    }
    const guard = formattedInput[pos[0]][pos[1]];
    let direction =
      guard === "^" ? 0 : guard === ">" ? 1 : guard === "<" ? 3 : 2;
    pos = [pos[0], pos[1], direction];
    let done = false;
    let loop = false;
    while (!done) {
      const posKey = `${pos[0]},${pos[1]},${pos[2]}`;
      if (part2 && visited.has(posKey)) {
        loop = true;
        break;
      }
      visited.add(posKey);
      if (!part2 && !result.some(([x, y]) => x === pos[0] && y === pos[1])) {
        result.push([...pos]);
      } else if (
        part2 &&
        !result.some(
          ([x, y, z]) => x === pos[0] && y === pos[1] && z === pos[2]
        )
      ) {
        result.push([...pos]);
      }
      if (direction === 0) {
        if (pos[0] === 0) {
          done = true;
          break;
        }
        const nextPoint = formattedInput[pos[0] - 1][pos[1]];
        if (nextPoint === "#") {
          direction = 1;
          pos = [pos[0], pos[1] + 1, 1];
        } else {
          pos = [pos[0] - 1, pos[1], 0];
        }
      } else if (direction === 1) {
        if (pos[1] === formattedInput[0].length - 1) {
          done = true;
          break;
        }
        const nextPoint = formattedInput[pos[0]][pos[1] + 1];
        if (nextPoint === "#") {
          direction = 2;
          pos = [pos[0] + 1, pos[1], 2];
        } else {
          pos = [pos[0], pos[1] + 1, 1];
        }
      } else if (direction === 2) {
        if (pos[0] === formattedInput.length - 1) {
          done = true;
          break;
        }
        const nextPoint = formattedInput[pos[0] + 1][pos[1]];
        if (nextPoint === "#") {
          direction = 3;
          pos = [pos[0], pos[1] - 1, 3];
        } else {
          pos = [pos[0] + 1, pos[1], 2];
        }
      } else {
        if (pos[1] === 0) {
          done = true;
          break;
        }
        const nextPoint = formattedInput[pos[0]][pos[1] - 1];
        if (nextPoint === "#") {
          direction = 0;
          pos = [pos[0] - 1, pos[1], 0];
        } else {
          pos = [pos[0], pos[1] - 1, 3];
        }
      }
    }
    return loop ? false : result;
  }

  return { doTheThing, doTheThingPart2 };
}
