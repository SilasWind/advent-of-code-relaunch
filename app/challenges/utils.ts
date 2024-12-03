import DayOne from "./2024/day1";

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
        default:
          return null;
      }
    default:
      return null;
  }
};
