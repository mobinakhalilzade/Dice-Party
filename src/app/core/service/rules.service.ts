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
  calculateTotalLowerSectionPoints() {

  }

  hasBonus(): boolean {
    if (this.totalUpperSectionPoints > 62) {
      this.totalUpperSectionPoints =+35;
      return true;
    } else {
      return false;
    }
  }

  hasThreeOfAKind(arr:IRandomDice[]) {
    const countMap: { [key: number]: number } = {};

    for (const num of arr) {
      countMap[num.value] = (countMap[num.value] || 0) + 1;
    }

    return Object.values(countMap).some((count) => count >= 3);
  }

  hasFourOfAKind(arr:IRandomDice[]) {
    const countMap: { [key: number]: number } = {};

    for (const num of arr) {
      countMap[num.value] = (countMap[num.value] || 0) + 1;
      // console.log(countMap);
    }

    return Object.values(countMap).some((count) => count >= 4);
  }

  calculateArraySum(arr:IRandomDice[]) {
    return arr.reduce((sum, num) => sum + num.value, 0);
  }

  hasFullHouse(arr:IRandomDice[]): boolean {
    const countMap: { [key: number]: number } = {};

    for (const num of arr) {
      countMap[num.value] = (countMap[num.value] || 0) + 1;
      console.log(countMap);

    }

    let hasThree = false;
    let hasTwo = false;

    for (const count of Object.values(countMap)) {
      if (count === 3) {
        hasThree = true;
      } else if (count === 2) {
        hasTwo = true;
      }
    }

    return hasThree && hasTwo;
  }

  hasSmallStraight(arr:IRandomDice[]): boolean {
    let countInOrder = 0;

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].value + 1 === arr[i + 1].value) {
        countInOrder++;
      }
    }

    return countInOrder >= 3;
  }

  hasLargeStraight(arr:IRandomDice[]): boolean {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].value + 1 !== arr[i + 1].value) {
        return false;
      }
    }

    return true;
  }

  hasFiveOfAKind(arr: IRandomDice[]): boolean {
    const firstNumber = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] !== firstNumber) {
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
    return currentPoint
  }
}
