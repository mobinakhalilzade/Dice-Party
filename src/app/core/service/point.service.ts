import { Injectable } from '@angular/core';
import { LocalStorageService } from './helpers/local-storage.service';
import { IUser } from '../interface/user.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PointService {
  constructor(
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  initPointData() {
    const points = [];
    this.localStorageService.setData('points', points);
  }

  setPoints(points) {
    this.localStorageService.setData('points', points);
    let userInfo = this.userService.getUserInfo();
    console.log(points);

    userInfo.currentScore = points.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    this.userService.setUserInfo(userInfo);
  }

  getPoints(): number {
    let points = this.localStorageService.getData('points');
    return points.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  }
}
