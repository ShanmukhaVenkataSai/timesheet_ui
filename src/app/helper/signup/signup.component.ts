import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private fb: FormBuilder, private helperService: HelperService) {}

  @Output() login: any = new EventEmitter<boolean>();

  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: new FormControl(undefined, Validators.required),
      email: new FormControl(undefined, Validators.required),
      password: new FormControl(undefined, Validators.required),
      confirmPassword: new FormControl(undefined, Validators.required),
    });
  }

  emitData() {
    this.login.emit(true);
  }

  onSubmit() {
    console.log(this.signupForm.valid);
    const formData = this.signupForm.getRawValue();
    console.log(formData, 'formData');
    this.helperService.signup(formData).subscribe({
      next: (res) => {},
      error: (err) => {
        console.error(err);
      },
    });
  }
}
