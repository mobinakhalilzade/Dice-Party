import { Component } from '@angular/core';
import { PointsTable } from './core/const/point.const';
import { IPointTable } from './core/interface/point.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  pointsTable: IPointTable = PointsTable;
  title = 'dice-party';
  randomNumbers: number[] = [];
  round=13
  roll=3

  generateRandomNumbers() {
    this.randomNumbers = [];
    for (let i = 0; i < 5; i++) {
      const randomNumber = Math.floor(Math.random() * 6) + 1; // Generates random number between 1 and 6
      this.randomNumbers.push(randomNumber);
      console.log(this.randomNumbers);

    }
  }

  selectDice(selectedDice){

  }

  submitRound(){}
}
