export default function DayFive(inputString: string) {
  const [prevRules, prevUpdate] = inputString.split("\n\n");
  const rules = prevRules
    ?.split("\n")
    .map(x => x.split("|").map(y => Number(y)));
  const updates = prevUpdate
    ?.split("\n")
    .map(x => x.split(",").map(y => Number(y)));

  const doTheThing = () => {
    return findInvalids() as number;
  };

  const doTheThingPart2 = () => {
    let result = 0;
    const invalidUpdates: number[][] = [];
    findInvalids(invalidUpdates);
    invalidUpdates.forEach(update => {
      const fixedUpdate = switchIndices(update);
      result += fixedUpdate[(fixedUpdate.length - 1) / 2];
    });
    return result;
  };

  const findInvalids = (invalidUpdates?: number[][]) => {
    let result = invalidUpdates ? undefined : 0;
    updates.forEach((update, i) => {
      let invalid = false;
      rules.forEach(rule => {
        const rule0Index = update.indexOf(rule[0]);
        const rule1Index = update.indexOf(rule[1]);
        if (rule0Index !== -1 && rule1Index !== -1) {
          if (rule0Index > rule1Index) {
            invalid = true;
          }
        }
      });
      if (invalid && invalidUpdates) {
        // bruh. previously: if (!invalid)
        invalidUpdates.push(update);
      } else if (!invalid && result !== undefined) {
        result += update[(update.length - 1) / 2];
      }
    });
    return result;
  };

  const switchIndices = (update: number[]) => {
    const updateCopy = [...update];
    let invalid = false;
    rules.forEach(rule => {
      const rule0Index = update.indexOf(rule[0]);
      const rule1Index = update.indexOf(rule[1]);
      if (rule0Index !== -1 && rule1Index !== -1) {
        if (rule0Index > rule1Index) {
          updateCopy.sort((a, b) => {
            if (a === rule[0] && b === rule[1]) {
              return -1;
            } else if (a === rule[1] && b === rule[0]) {
              return 1;
            } else {
              return 0;
            }
          });
          invalid = true;
        }
      }
    });
    if (invalid) {
      return switchIndices(updateCopy);
    } else {
      return updateCopy;
    }
  };

  return { doTheThing, doTheThingPart2 };
}
