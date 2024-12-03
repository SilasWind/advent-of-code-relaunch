export default function DayOne(inputString: string) {
  const doTheThing = () => {
    const { firstArr, secondArr } = getFormattedArrays(inputString, true);
    let result = 0;
    for (let i = 0; i < firstArr.length; i++) {
      result = result + Math.abs(firstArr[i] - secondArr[i]);
    }
    return result;
  };

  const doTheThingPart2 = () => {
    const { firstArr, secondArr } = getFormattedArrays(inputString, true);
    let result = 0;
    firstArr.forEach(el => {
      let findings = 0;
      secondArr.forEach(el2 => {
        if (el === el2) {
          findings++;
        }
      });
      result = result + el * findings;
    });
    return result;
  };

  return { doTheThing, doTheThingPart2 };
}

const getFormattedArrays = (inputString: string, sort?: boolean) => {
  let firstArr: number[] = [];
  let secondArr: number[] = [];
  inputString
    .split("\n")
    .map(x => x.split("   "))
    .map(x => {
      firstArr.push(parseInt(x[0]));
      secondArr.push(parseInt(x[1]));
      return x;
    });
  if (sort) {
    firstArr.sort((a, b) => a - b);
    secondArr.sort((a, b) => a - b);
  }
  return { firstArr, secondArr };
};
