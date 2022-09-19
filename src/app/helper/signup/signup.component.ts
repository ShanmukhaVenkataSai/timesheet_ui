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
      first_name: new FormControl(undefined, Validators.required),
      last_name: new FormControl(undefined),
      email: new FormControl(undefined, Validators.required),
      password: new FormControl(undefined, Validators.required),
      confirmPassword: new FormControl(undefined, Validators.required),
    });
  }

  emitData() {
    this.login.emit(true);
  }

  onSubmit() {
    if(this.signupForm.valid){
      const formData = this.signupForm.getRawValue();
      formData.first_name=formData.first_name.trim()
      formData.last_name=formData.last_name.trim()
      formData.email=formData.email.trim()
      formData.password=formData.password.trim()
      formData.confirmPassword=formData.confirmPassword.trim()
      this.helperService.signup(formData).subscribe({
        next: (res:any) => {
          if(res.code==200){
            this.emitData()
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  
  }
}
