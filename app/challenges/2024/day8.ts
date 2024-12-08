export default function DayEight(inputString: string) {
  const formattedInput = inputString.split("\n").map(e => e.split(""));
  const doTheThing = () => {
    let result = 0;
    formattedInput.forEach((row, index) => {
      row.forEach((char, i) => {});
    });
    return result;
  };

  const doTheThingPart2 = () => {
    let result = 0;
    return result;
  };

  return { doTheThing, doTheThingPart2 };
}
