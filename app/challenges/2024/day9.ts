export default function DayNine(inputString: string) {
  const formatString = () => {
    let newInput: string[] = [];
    inputString.split("").forEach((char, i) => {
      for (let j = 0; j < Number(char); j++) {
        newInput.push(i % 2 === 0 ? String(i / 2) : ".");
      }
    });
    while (newInput[newInput.length - 1] === ".") {
      newInput.pop();
    }
    return newInput;
  };

  const doTheThing = () => {
    let result = 0;
    const newInput: string[] = formatString();
    let done = false;
    while (!done) {
      const firstSpace = newInput.indexOf(".");
      if (firstSpace === -1) {
        done = true;
        break;
      }
      newInput.splice(firstSpace, 1, newInput[newInput.length - 1]);
      newInput.pop();
    }
    result = newInput.reduce((acc, cur, index) => acc + Number(cur) * index, 0);

    return result;
  };

  const doTheThingPart2 = () => {
    let result = 0;
    const newInput: string[] = formatString();
    let done = false;

    for (let i = Number(newInput[newInput.length - 1]); i >= 0; i--) {
      let currId = newInput[newInput.length - 1];
      let currDotIndex = 0;
      const idIndices: number[] = [];
      let allIndicesFound = false;
      while (!allIndicesFound) {
        const newIndex = newInput
          .slice(idIndices[idIndices.length - 1])
          .findIndex(char => char === currId);
        console.log(newIndex);

        if (newIndex === -1) {
          allIndicesFound = true;
          break;
        }
        idIndices.push(newIndex);
      }
      console.log(idIndices);

      // while (!done) {
      //   const firstSpace = newInput.slice(currDotIndex).indexOf(".");
      //   if (firstSpace === -1 && currId === "0") {
      //     done = true;
      //     break;
      //   } else if (firstSpace === -1) {
      //     currId = "0";
      //     currDotIndex = 0;
      //     continue;
      //   }
      //   const spaceLength =
      //     newInput.slice(firstSpace).findIndex(char => char !== ".") -
      //     firstSpace;
      //   newInput.splice(firstSpace, 1, newInput[newInput.length - 1]);
      //   newInput.pop();
      // }
    }

    return result;
  };

  return { doTheThing, doTheThingPart2 };
}
