import React, { useState } from "react";
import InputComp from "../../inputComp";

function DaySeven() {
  const [part2, setPart2] = useState(false);
  const [inputString, setInputString] = useState("");
  const [output, setOutput] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputString(e.target.value);
  };

  const categorizeHand = (hand: string) => {
    const convertCardValue = (card: string) => {
      switch (card) {
        case "T":
          return 10;
        case "J":
          return part2 ? 1 : 11;
        case "Q":
          return 12;
        case "K":
          return 13;
        case "A":
          return 14;
        default:
          return parseInt(card);
      }
    };
    const convertedHand = hand.split("").map((card) => {
      return convertCardValue(card);
    });
    type matchType = {
      firstMatch: number;
      firstAmount: number;
      secondMatch: number;
      secondAmount: number;
    };
    let match: matchType = {
      firstMatch: 0,
      firstAmount: 1,
      secondMatch: 0,
      secondAmount: 1,
    };
    let indicesFound: number[] = [];
    let highestCard = 0;
    hand.split("").forEach((card, index) => {
      const cardValue = convertCardValue(card);
      if (cardValue > highestCard) {
        highestCard = cardValue;
      }
      hand.split("").forEach((card2, index2) => {
        const cardValue2 = convertCardValue(card2);
        if (index < index2) {
          if (
            cardValue === cardValue2 &&
            !indicesFound.includes(index2) &&
            cardValue !== 1
          ) {
            indicesFound.push(index2);
            if (!match.firstMatch) {
              match.firstMatch = cardValue;
              match.firstAmount = 2;
            } else if (cardValue === match.firstMatch) {
              match.firstAmount++;
            } else if (!match.secondMatch) {
              match.secondMatch = cardValue;
              match.secondAmount = 2;
            } else if (cardValue === match.secondMatch) {
              match.secondAmount++;
            }
          }
        }
      });
    });
    if (part2) {
      let jackAmount = 0;
      hand.split("").forEach((card) => {
        if (card === "J") {
          jackAmount++;
        }
      });
      if (match.firstAmount >= match.secondAmount) {
        if (match.firstAmount + jackAmount > 5) {
          match.firstAmount = 5;
        } else {
          match.firstAmount = match.firstAmount + jackAmount;
        }
      } else {
        if (match.secondAmount + jackAmount > 5) {
          match.secondAmount = 5;
        } else {
          match.secondAmount = match.secondAmount + jackAmount;
        }
      }
    }
    if (match.firstAmount === 2 && match.secondAmount === 2) {
      return [[2], convertedHand];
    } else if (match.firstAmount >= 2 || match.secondAmount >= 2) {
      if (match.firstAmount >= 3 || match.secondAmount >= 3) {
        if (match.firstAmount >= 4 || match.secondAmount >= 4) {
          if (match.firstAmount === 5 || match.secondAmount === 5) {
            return [[6], convertedHand];
          }
          return [[5], convertedHand];
        } else if (
          (match.firstAmount === 3 && match.secondAmount === 2) ||
          (match.firstAmount === 2 && match.secondAmount === 3)
        ) {
          return [[4], convertedHand];
        }
        return [[3], convertedHand];
      }
      return [[1], convertedHand];
    } else {
      return [[0], convertedHand];
    }
  };

  const doTheThing = () => {
    const inputArray = inputString.split(/\r?\n/).filter((el) => el);
    let handArray: string[][] = [];
    inputArray.forEach((el) => {
      handArray.push(el.split(" "));
    });
    let currentHighestHand = [-1, 0];
    let currentHighestArray: number[] = [];
    let leaderboard: string[][] = [];
    const hackyLoopLength = handArray.length;
    for (let i = 0; i < hackyLoopLength; i++) {
      handArray.forEach((hand, index) => {
        const catHand = categorizeHand(hand[0]);
        if (catHand[0][0] === currentHighestHand[0]) {
          for (let j = 0; j < 5; j++) {
            if (catHand[1][j] > currentHighestArray[j]) {
              currentHighestHand = [catHand[0][0], index];
              currentHighestArray = catHand[1];
              break;
            }
            if (catHand[1][j] < currentHighestArray[j]) {
              break;
            }
          }
        } else if (catHand[0][0] > currentHighestHand[0]) {
          currentHighestHand = [catHand[0][0], index];
          currentHighestArray = catHand[1];
        }
      });
      leaderboard.push(handArray[currentHighestHand[1]]);
      handArray.splice(currentHighestHand[1], 1);
      currentHighestHand = [-1, 0];
      currentHighestArray = [];
    }
    let totalWinnings = 0;
    for (let i = 0; i < leaderboard.length; i++) {
      totalWinnings += (leaderboard.length - i) * parseInt(leaderboard[i][1]);
    }
    setOutput(totalWinnings);
  };
  return (
    <InputComp
      part2={part2}
      setPart2={setPart2}
      inputString={inputString}
      output={output}
      part1Func={doTheThing}
      part2Func={doTheThing}
      handleChange={handleChange}
      dayNumber={7}
    />
  );
}

export default DaySeven;
