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
    const points = 0;
    this.localStorageService.setData('points', points);
  }

  setPoints(point) {
    let currentPoint = this.getPoints();
    let newPoint = currentPoint + point;
    this.localStorageService.setData('points', newPoint);
    console.log(newPoint);

    // let userInfo = this.userService.getUserInfo();
    // userInfo.currentScore = points.reduce(
    //   (accumulator, currentValue) => accumulator + currentValue,
    //   0
    // );
    // this.userService.setUserInfo(userInfo);
  }

  getPoints(): number {
    return this.localStorageService.getData('points');
  }
}
