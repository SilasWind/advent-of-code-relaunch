export default function DayThree(inputString: string) {
  const doTheThing = () => {
    const regex = /mul\(\d+,\d+\)/g;
    const matches = inputString.match(regex);
    let result = 0;

    matches?.map((match) => {
      const [a, b] = match
        .replace("mul(", "")
        .replace(")", "")
        .split(",")
        .map((x) => parseInt(x));
      return (result += a * b);
    });
    return result;
  };

  const doTheThingPart2 = () => {
    const regex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;
    const matches = inputString.match(regex);

    let result = 0;
    let enabled = true;
    matches?.forEach((match) => {
      if (match === "do()") {
        enabled = true;
      } else if (match === "don't()") {
        enabled = false;
      } else {
        if (enabled) {
          const [a, b] = match
            .replace("mul(", "")
            .replace(")", "")
            .split(",")
            .map((x) => parseInt(x));
          result += a * b;
        }
      }
    });
    return result;
  };
  return { doTheThing, doTheThingPart2 };
}
