import { Component, OnInit } from '@angular/core';
import { PointsTable } from './core/const/point.const';
import { IPointTable, ISection } from './core/interface/point.interface';
import { RulesService } from './core/service/rules.service';
import { IRandomDice } from './core/interface/dice.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  pointsTable: IPointTable = PointsTable;
  randomNumbers: IRandomDice[] = [];
  round = 13;
  roll = 3;
  selectedDiceIndices: IRandomDice[] = [];

  constructor(private rulesService: RulesService) {}

  ngOnInit(): void {}

  generateRandomNumbers() {
    this.roll--;
    const selectedDice = this.randomNumbers.filter((dice) => dice.isSelect);
    const unselectedDiceCount = 5 - selectedDice.length;

    if (unselectedDiceCount > 0) {
      this.randomNumbers = selectedDice.map((dice) => ({
        ...dice,
        isSelect: true,
      }));

      for (let i = 0; i < unselectedDiceCount; i++) {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        this.randomNumbers.push({ value: randomNumber, isSelect: false });
        console.log(this.randomNumbers);
        this.getPossiblePointsForUpperSection(
          this.randomNumbers,
          this.pointsTable.upperSection
        );
        this.getPossiblePointsForLowerSection(
          this.randomNumbers,
          this.pointsTable.lowerSection
        );
      }
    }
  }

  selectDice(selectedDice, index) {
    const selectedIndex = this.selectedDiceIndices.indexOf(index);
    if (selectedIndex !== -1) {
      this.selectedDiceIndices.splice(selectedIndex, 1);
    } else {
      this.selectedDiceIndices.push(index);
    }
  }

  getPossiblePointsForLowerSection(
    arr: IRandomDice[],
    lowerSection: ISection[]
  ) {
    if (this.rulesService.hasThreeOfAKind(arr)) {
      lowerSection[0].point = this.rulesService.calculateArraySum(arr);
    } else if (this.rulesService.hasFourOfAKind(arr)) {
      lowerSection[1].point = this.rulesService.calculateArraySum(arr);
    } else if (this.rulesService.hasFullHouse) {
      lowerSection[2].point = lowerSection[2].multiplier;
    } else if (this.rulesService.hasSmallStraight) {
      lowerSection[3].point = lowerSection[3].multiplier;
    } else if (this.rulesService.hasLargeStraight) {
      lowerSection[4].point = lowerSection[4].multiplier;
    } else if (this.rulesService.hasFiveOfAKind) {
      lowerSection[5].point = lowerSection[5].multiplier;
    } else {
      lowerSection[6].point = this.rulesService.calculateArraySum(arr);
    }
  }

  getPossiblePointsForUpperSection(
    arr: IRandomDice[],
    upperSection: ISection[]
  ) {
    const valueCounts = arr.reduce((counts, item) => {
      counts[item.value] = (counts[item.value] || 0) + 1;
      return counts;
    }, {});

    upperSection.forEach((item) => {
      const count = valueCounts[item.multiplier];
      if (count) {
        item.point = item.multiplier * count;
      } else {
        item.point = 0;
      }
    });
  }

  submitRound() {
    this.roll = 3;
    this.round--;
    if (this.round === 0) {
      console.log('end of the game');
      return;
    }
  }
}
