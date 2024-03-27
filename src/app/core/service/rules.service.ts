import { Injectable } from '@angular/core';
import { IRandomDice } from '../interface/dice.interface';

@Injectable({
  providedIn: 'root',
})
export class RulesService {
  totalUpperSectionPoints: number;
  totalLowerSectionPoints: number;

  calculateUpperSectionPoints(multiplier: number, quantity: number): number {
    return multiplier * quantity;
  }

  calculateTotalUpperSectionPoints() {}
  calculateTotalLowerSectionPoints() {}

  hasBonus(): boolean {
    if (this.totalUpperSectionPoints > 62) {
      this.totalUpperSectionPoints = +35;
      return true;
    } else {
      return false;
    }
  }

  hasThreeOfAKind(arr: IRandomDice[]) {
    const objectCounts = {};
    arr.forEach((item) => {
      objectCounts[item.value] = (objectCounts[item.value] || 0) + 1;
    });
    return Object.values(objectCounts).some((count: any) => count >= 3);
  }

  hasFourOfAKind(arr: IRandomDice[]) {
    const objectCounts = {};
    arr.forEach((item) => {
      objectCounts[item.value] = (objectCounts[item.value] || 0) + 1;
    });
    return Object.values(objectCounts).some((count: any) => count >= 4);
  }

  calculateArraySum(arr: IRandomDice[]) {
    return arr.reduce((sum, num) => sum + num.value, 0);
  }

  hasFullHouse(arr: IRandomDice[]): boolean {
    const objectCounts = {};

    arr.forEach((item) => {
      objectCounts[item.value] = (objectCounts[item.value] || 0) + 1;
    });
    console.log(objectCounts);

    let hasThree = false;
    let hasTwo = false;

    Object.values(objectCounts).forEach((count) => {
      if (count === 3) {
        hasThree = true;
      } else if (count === 2) {
        hasTwo = true;
      }
    });

    return hasThree && hasTwo;
  }

  hasSmallStraight(arr: IRandomDice[]): boolean {
    const sortedArr = arr.slice().sort((a, b) => a.value - b.value);
    let count = 1;
    let maxCount = 1;

    for (let i = 1; i < sortedArr.length; i++) {
      if (sortedArr[i].value === sortedArr[i - 1].value + 1) {
        count++;
        maxCount = Math.max(maxCount, count);
      } else {
        count = 1;
      }
    }

    return maxCount >= 4;
  }

  hasLargeStraight(arr: IRandomDice[]): boolean {
    const sortedArr = arr.slice().sort((a, b) => a.value - b.value);

    let count = 1;
    let maxCount = 1;

    for (let i = 1; i < sortedArr.length; i++) {
      if (sortedArr[i].value === sortedArr[i - 1].value + 1) {
        count++;
        maxCount = Math.max(maxCount, count);
      } else {
        count = 1;
      }
    }

    return maxCount === 5;
  }

  hasFiveOfAKind(arr: IRandomDice[]): boolean {
    const firstNumber = arr[0].value;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i].value !== firstNumber) {
        return false;
      }
    }

    return true;
  }

  calculateFiveOfAKindPoints(currentPoint: number): number {
    if (this.hasFiveOfAKind) {
      if (currentPoint === 0) {
        return 50;
      } else if (currentPoint >= 50) {
        return currentPoint + 100;
      }
    }
    return currentPoint;
  }
}
