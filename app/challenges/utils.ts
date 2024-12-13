import DayOne from "./2024/day1";
import DayTwo from "./2024/day2";
import DayThree from "./2024/day3";
import DayFour from "./2024/day4";
import DayFive from "./2024/day5";
import DaySix from "./2024/day6";
import DaySeven from "./2024/day7";
import DayEight from "./2024/day8";
import DayNine from "./2024/day9";

export const useDoTheThing = (
  inputString: string,
  year: number,
  day: number
): {
  doTheThing: () => number;
  doTheThingPart2: () => number;
  visualization?: () => JSX.Element | null;
} => {
  const fallback = {
    doTheThing: () => 0,
    doTheThingPart2: () => 0,
    visualization: () => null,
  };
  switch (year) {
    case 2024:
      switch (day) {
        case 1:
          return DayOne(inputString);
        case 2:
          return DayTwo(inputString);
        case 3:
          return DayThree(inputString);
        case 4:
          return DayFour(inputString);
        case 5:
          return DayFive(inputString);
        case 6:
          return DaySix(inputString);
        case 7:
          return DaySeven(inputString);
        case 8:
          return DayEight(inputString);
        case 9:
          return DayNine(inputString);
        default:
          return fallback;
      }
    default:
      return fallback;
  }
};
