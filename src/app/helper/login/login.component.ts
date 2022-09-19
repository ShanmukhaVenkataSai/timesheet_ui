import { Component, OnInit } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Login } from 'src/interfaces/login.interface';

import { HelperService } from '../helper.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private helperService: HelperService,
    private sharedService: SharedService,
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

  onSubmit() {
    const formData: Login = this.loginForm.getRawValue();
    this.helperService.login(formData).subscribe({
      next: (res) => {
        sessionStorage.setItem('userdetails', JSON.stringify(res.data));
        this.router.navigate(['upload-sheet']);
      },
      error: (err) => {
        if (err.error.code == 404 || err.error.code == 401) {
          this.sharedService.openSnackBar(
            'Invalid Email or Password',
            undefined,
            'failure',
            2000
          );
        } else if (err.error.code == 403) {
          this.sharedService.openSnackBar(
            'Inactive User. Please contact admin to activate your Account.',
            undefined,
            'failure',
            4000
          );
        } else if (err.error.code == 409) {
          this.sharedService.openSnackBar(
            'Something went wrong',
            undefined,
            'failure',
            3000
          );
        }
      },
    });
  }
}
