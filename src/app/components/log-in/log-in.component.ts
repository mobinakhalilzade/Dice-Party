import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IUser } from 'src/app/core/interface/user.interface';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, CommonModule, FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  name = '';

  constructor(
    public dialogRef: MatDialogRef<LogInComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {}

  onNameSubmit() {
    const user: IUser = {
      name: this.name,
      highestScore: 0,
    };
    this.userService.setUserInfo(user);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
