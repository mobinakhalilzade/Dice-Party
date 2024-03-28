import { Component, OnDestroy, OnInit } from '@angular/core';
import { PointsTable } from './core/const/point.const';
import { IPointTable, ISection } from './core/interface/point.interface';
import { RulesService } from './core/service/rules.service';
import { IRandomDice } from './core/interface/dice.interface';
import { PointService } from './core/service/point.service';
import { ResultComponent } from './components/result/result.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  pointsTable: IPointTable = PointsTable;
  randomNumbers: IRandomDice[] = [];
  round = 13;
  roll = 3;
  selectedDiceIndices: IRandomDice[] = [];
  resetRound = false;

  constructor(
    public dialog: MatDialog,
    private rulesService: RulesService,
    private pointService: PointService
  ) {}

  ngOnInit(): void {
    this.pointService.initPointData();
  }

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
        console.log(randomNumber);

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
    this.rulesService.hasThreeOfAKind(arr)
      ? (lowerSection[0].point = this.rulesService.calculateArraySum(arr))
      : (lowerSection[0].point = 0);
    this.rulesService.hasFourOfAKind(arr)
      ? (lowerSection[1].point = this.rulesService.calculateArraySum(arr))
      : (lowerSection[1].point = 0);
    this.rulesService.hasFullHouse(arr)
      ? (lowerSection[2].point = lowerSection[2].multiplier)
      : (lowerSection[2].point = 0);
    this.rulesService.hasSmallStraight(arr)
      ? (lowerSection[3].point = lowerSection[3].multiplier)
      : (lowerSection[3].point = 0);
    this.rulesService.hasLargeStraight(arr)
      ? (lowerSection[4].point = lowerSection[4].multiplier)
      : (lowerSection[4].point = 0);
    this.rulesService.hasFiveOfAKind(arr)
      ? (lowerSection[5].point =
          this.rulesService.calculateFiveOfAKindPoints(0))
      : (lowerSection[5].point = 0);
    lowerSection[6].point = this.rulesService.calculateArraySum(arr);
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

  selectUpperSectionPoint(upperSection: ISection) {
    if (upperSection.submittedPoint) {
      return;
    }
    this.pointsTable.lowerSection.forEach((ls) => {
      ls.isSelect = false;
    });
    this.pointsTable.upperSection.forEach((sec) => {
      sec.isSelect = sec.id === upperSection.id;
    });

    console.log(upperSection);
  }

  selectLowerSectionPoint(lowerSec: ISection) {
    if (lowerSec.submittedPoint) {
      return;
    }
    this.pointsTable.upperSection.forEach((us) => {
      us.isSelect = false;
    });
    this.pointsTable.lowerSection.forEach((sec) => {
      sec.isSelect = sec.id === lowerSec.id;
    });

    console.log(lowerSec);
  }

  submitRound() {
    this.randomNumbers = [];
    this.roll = 3;
    this.round--;
    if (this.round === 0) {
      this.openResultDialog();
      return;
    }

    const selectedUpperSectionPoint = this.pointsTable.upperSection.find(
      (upSec) => upSec.isSelect && !upSec.submittedPoint
    );

    const selectedLowerSectionPoint = this.pointsTable.lowerSection.find(
      (loSec) => loSec.isSelect && !loSec.submittedPoint
    );

    if (selectedUpperSectionPoint) {
      selectedUpperSectionPoint.submittedPoint =
        selectedUpperSectionPoint.point;
      this.pointService.setPoints(selectedUpperSectionPoint.submittedPoint);
    }

    if (selectedLowerSectionPoint) {
      selectedLowerSectionPoint.submittedPoint =
        selectedLowerSectionPoint.point;
      this.pointService.setPoints(selectedLowerSectionPoint.submittedPoint);
    }

    this.pointsTable.upperSection.forEach((upSec) => {
      if (!upSec.isSelect) {
        upSec.point = null;
      }
    });

    this.pointsTable.lowerSection.forEach((loSec) => {
      if (!loSec.isSelect) {
        loSec.point = null;
      }
    });
  }

  getSectionPointTotal(section: ISection[]): number {
    return section.reduce(
      (accumulator, currentValue) => accumulator + currentValue.submittedPoint,
      0
    );
  }

  ngOnDestroy(): void {
    this.pointService.initPointData();
  }

  openResultDialog(): void {
    const dialogRef = this.dialog.open(ResultComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result='newGame') {
        this.round = 13
        this.roll = 3
        this.randomNumbers = []
      }
    });
  }
}
