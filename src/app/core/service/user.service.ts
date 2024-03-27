import { Injectable } from '@angular/core';
import { LocalStorageService } from './helpers/local-storage.service';
import { IUser } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private localStorageService: LocalStorageService) {}

  setUserInfo(data: IUser) {
    this.localStorageService.setData('userInfo', data);
  }

  getUserInfo() :IUser{
   return this.localStorageService.getData('userInfo');
  }

  hasUserInfo(): boolean {
    return this.localStorageService.getData('userInfo');
  }
}
