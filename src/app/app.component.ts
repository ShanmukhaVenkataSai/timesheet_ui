import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Config, DataArray } from 'src/interfaces/app.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'timeline_ui';
  date: Date = new Date();

  formArray: FormArray;

  configData: Config[] = [];

  allHours: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];

  allMinutes: number[] = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  dataForm: FormGroup;

  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit() {
    this.dataForm = this.fb.group({
      content: this.fb.array([]),
    });
    this.getConfig();
  }

  getConfig() {
    this.appService.getConfig().subscribe((data) => {
      this.configData = data.data;
      this.resetData();
      this.getTimeSheet();
    });
  }

  getTimeSheet() {
    const date = new DatePipe('en-US').transform(this.date, 'yyyy-MM-dd');
    if (date) {
      this.appService.getTimeSheet(date).subscribe({
        next: (res) => {},
        error: (err) => {
          console.error('ERROR IN getTimeSheet', err);
        },
      });
    }
  }

  onSubmit() {
    const dataArray: DataArray[] = this.dataForm.getRawValue().content;
    const body: DataArray[] = [];
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const onlyDate = new DatePipe('en-US').transform(this.date, 'yyyy-MM-dd');
    dataArray.forEach((element) => {
      if (element.checked) {
        body.push({
          name: element.name,
          hours: Number(element.hours),
          minutes: Number(element.minutes),
          date: onlyDate ? onlyDate : '',
          timezone: timezone,
        });
      }
    });

    this.appService.insertTimeSheet(body).subscribe({
      next: (res) => {},
      error: (err) => {
        console.error('ERROR IN INSERT TIMESHEET', err);
      },
    });
  }

  getControls() {
    return (this.dataForm.get('content') as FormArray).controls;
  }

  onChecked(flag: boolean, index: number) {
    console.log(this.dataForm.get('content'));
    if (flag) {
      let content = (this.dataForm.get('content') as FormArray).controls;
      content[index].get('hours')?.enable();
      content[index].get('hours')?.setValidators([Validators.required]);
      content[index].get('hours')?.updateValueAndValidity();

      content[index].get('minutes')?.enable();
      content[index].get('minutes')?.setValidators([Validators.required]);
      content[index].get('minutes')?.updateValueAndValidity();
      return;
    }

    let content = (this.dataForm.get('content') as FormArray).controls;
    content[index].get('hours')?.disable();
    content[index].get('hours')?.clearValidators();
    content[index].get('hours')?.updateValueAndValidity();

    content[index].get('minutes')?.disable();
    content[index].get('minutes')?.clearValidators();
    content[index].get('minutes')?.updateValueAndValidity();
  }

  createItem(name: string) {
    return this.fb.group({
      checked: new FormControl(false),
      name: new FormControl(name),
      hours: new FormControl({
        value: undefined,
        disabled: true,
      }),
      minutes: new FormControl({
        value: undefined,
        disabled: true,
      }),
    });
  }

  resetData() {
    this.dataForm = this.fb.group({
      content: this.fb.array([]),
    });
    let dataArray = <FormArray>this.dataForm.get('content');
    this.configData.forEach((element) => {
      dataArray.push(this.createItem(element.name));
    });
  }
}
