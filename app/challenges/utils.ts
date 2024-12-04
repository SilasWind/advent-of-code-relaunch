import DayOne from "./2024/day1";
import DayTwo from "./2024/day2";
import DayThree from "./2024/day3";

export const useDoTheThing = (
  inputString: string,
  year: number,
  day: number
) => {
  switch (year) {
    case 2024:
      switch (day) {
        case 1:
          return DayOne(inputString);
        case 2:
          return DayTwo(inputString);
        case 3:
          return DayThree(inputString);
        default:
          return null;
      }
    default:
      return null;
  }
};
