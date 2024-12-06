import DayOne from "./2024/day1";
import DayTwo from "./2024/day2";
import DayThree from "./2024/day3";
import DayFour from "./2024/day4";
import DayFive from "./2024/day5";
import DaySix from "./2024/day6";

export const useDoTheThing = (
  inputString: string,
  year: number,
  day: number
) => {
  const fallback = {
    doTheThing: () => 0,
    doTheThingPart2: () => 0,
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
        default:
          return fallback;
      }
    default:
      return fallback;
  }
};
