import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/interface/user.interface';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  userInfo: IUser;
  anonymousUser = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.hasUserInfo()
      ? this.getUserData()
      : (this.anonymousUser = true);
    this.getUserData();
  }

  getUserData() {
    this.userInfo = this.userService.getUserInfo();
  }
}
