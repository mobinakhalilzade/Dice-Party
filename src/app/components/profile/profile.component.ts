import { Component, OnInit, Optional } from '@angular/core';
import { IUser } from 'src/app/core/interface/user.interface';
import { UserService } from 'src/app/core/service/user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LogInComponent } from '../log-in/log-in.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  userInfo: IUser;
  anonymousUser = false;
  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.hasUserInfo() ? this.getUserData() : this.openDialog();
  }

  getUserData() {
    this.userInfo = this.userService.getUserInfo();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LogInComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userInfo = result;
        this.anonymousUser = false;
      } else {
        this.anonymousUser = true;
      }
    });
  }
}
