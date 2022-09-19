import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Login } from 'src/interfaces/login.interface';

import { HelperService } from '../helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private helperService: HelperService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  hide: boolean = true;

  login: boolean = true;

  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl(undefined, Validators.required),
      password: new FormControl(undefined, Validators.required),
    });
  }

  openSnackBar(
    message: string,
    action: string | undefined,
    options: MatSnackBarConfig
  ) {
    this.snackBar.open(message, action, options);
  }

  onSubmit() {
    const formData: Login = this.loginForm.getRawValue();
    this.helperService.login(formData).subscribe({
      next: (res) => {
        sessionStorage.setItem('userdetails', JSON.stringify(res.data));
        this.router.navigate(['upload-sheet']);
      },
      error: (err) => {
        if (err.error.code == 404 || err.error.code == 401) {
          const snackbarConfig = new MatSnackBarConfig();
          snackbarConfig.panelClass = 'snack-failure-msg';
          snackbarConfig.duration = 2000;
          this.openSnackBar(
            'Invalid Email or Password',
            undefined,
            snackbarConfig
          );
        } else if (err.error.code == 403) {
          const snackbarConfig = new MatSnackBarConfig();
          snackbarConfig.panelClass = 'snack-failure-msg';
          snackbarConfig.duration = 4000;
          this.openSnackBar(
            'Inactive User. Please contact admin to activate your Account.',
            undefined,
            snackbarConfig
          );
        } else if (err.error.code == 409) {
          const snackbarConfig = new MatSnackBarConfig();
          snackbarConfig.panelClass = 'snack-failure-msg';
          snackbarConfig.duration = 3000;
          this.openSnackBar('Something went wrong', undefined, snackbarConfig);
        }
      },
    });
  }
}
