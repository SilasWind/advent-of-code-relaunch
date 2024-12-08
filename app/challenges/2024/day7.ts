export default function DaySeven(inputString: string) {
  const formattedInput = inputString.split("\n").map(e => e.split(": "));

  const generateEquations = (
    numbers: string[],
    operators: string[]
  ): string[] => {
    if (numbers.length === 1) return [numbers[0]];
    const first = numbers[0];
    const rest = numbers.slice(1);
    const restEquations = generateEquations(rest, operators);
    const equations = [];
    for (const operator of operators) {
      for (const eq of restEquations) {
        equations.push(`${first}${operator}${eq}`);
      }
    }
    return equations;
  };

  const evaluateEquation = (equation: string) => {
    const tokens = equation.split(/([+*]|\|\|)/);
    let result = Number(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const nextNumber = Number(tokens[i + 1]);
      if (operator === "+") {
        result += nextNumber;
      } else if (operator === "*") {
        result *= nextNumber;
      } else if (operator === "||") {
        result = Number(String(result) + String(nextNumber));
      }
    }
    return result;
  };

  const doTheThing = () => {
    let result: Set<number> = new Set();
    formattedInput.forEach(pair => {
      const numbers = pair[1].split(" ");
      const equations = generateEquations(numbers, ["+", "*"]);
      const solution = parseInt(pair[0]);
      equations.forEach(eq => {
        try {
          evaluateEquation(eq);
          if (evaluateEquation(eq) === solution) {
            result.add(solution);
          }
        } catch (e) {
          console.log(e);
        }
      });
    });

    return Array.from(result).reduce((acc, curr) => acc + curr, 0);
  };

  const doTheThingPart2 = () => {
    let result: Set<number> = new Set();
    formattedInput.forEach(pair => {
      const numbers = pair[1].split(" ");
      const equations = generateEquations(numbers, ["+", "*", "||"]);
      const solution = parseInt(pair[0]);
      equations.forEach(eq => {
        try {
          evaluateEquation(eq);
          if (evaluateEquation(eq) === solution) {
            result.add(solution);
          }
        } catch (e) {
          console.log(e);
        }
      });
    });
    return Array.from(result).reduce((acc, curr) => acc + curr, 0);
  };

  return { doTheThing, doTheThingPart2 };
}
