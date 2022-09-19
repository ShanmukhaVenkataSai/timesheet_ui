import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AppService } from '../app.service';
import { Config, DataArray, InsertTimeSheetRequest } from 'src/interfaces/app.interface';
import { DatePipe } from '@angular/common';
import { SharedService } from 'src/shared/shared.service';
import { userDetails } from 'src/interfaces/storage.interface';

@Component({
  selector: 'app-upload-sheet',
  templateUrl: './upload-sheet.component.html',
  styleUrls: ['./upload-sheet.component.scss'],
})
export class UploadSheetComponent implements OnInit {
  date: Date = new Date();

  formArray: FormArray;

  configData: Config[] = [];

  allHours: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];

  allMinutes: number[] = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  dataForm: FormGroup;

  userDetails: userDetails;

  timeZone: string;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.userDetails = this.sharedService.getUserDetails();
    this.dataForm = this.fb.group({
      content: this.fb.array([]),
    });
    this.getConfig();
  }

  getConfig() {
    this.appService.getConfig().subscribe((data) => {
      this.configData = data.data;
      this.getTimeSheet();
    });
  }

  getTimeSheet() {
    const date = new DatePipe('en-US').transform(this.date, 'yyyy-MM-dd');
    if (date) {
      let body = {
        date,
        timezone: this.timeZone,
        user: this.userDetails.email,
      };
      this.appService.getTimeSheet(body).subscribe({
        next: (res) => {
          if (res.code == 200) {
            this.dataForm = this.fb.group({
              content: this.fb.array([]),
            });
            let dataArray = <FormArray>this.dataForm.get('content');
            this.configData.forEach((element) => {
              let hr = undefined,
                min = undefined;
              const index = res.data.findIndex((x) => x.name == element.name);
              if (index != -1) {
                hr =
                  res.data[index].hours != 0
                    ? res.data[index].hours
                    : undefined;
                min =
                  res.data[index].minutes != 0
                    ? res.data[index].minutes
                    : undefined;
              }
              dataArray.push(this.createItem(element.name, hr, min));
            });
          }
        },
        error: (err) => {
          console.error('ERROR IN getTimeSheet', err);
        },
      });
    }
  }

  onSubmit() {
    const dataArray: DataArray[] = this.dataForm.getRawValue().content;
    if (dataArray.length > 0) {
      const onlyDate: any = new DatePipe('en-US').transform(
        this.date,
        'yyyy-MM-dd'
      );
      const body:InsertTimeSheetRequest = {
        date:onlyDate,
        data:[],
        user: this.userDetails.email,
        timezone: this.timeZone
      };
      dataArray.forEach((element) => {
        if (element.checked) {
          body.data.push({
            name: element.name,
            hours: element.hours ?  Number(element.hours) : 0,
            minutes: element.minutes ? Number(element.minutes) : 0,
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
      return;
    }

    let content = (this.dataForm.get('content') as FormArray).controls;
    content[index].get('hours')?.disable();
    content[index].get('hours')?.clearValidators();
    content[index].get('hours')?.updateValueAndValidity();

    content[index].get('minutes')?.disable();
  }

  createItem(name: string, hours: any, minutes: any) {
    const checked =
      hours || hours == 0 || minutes || minutes == 0 ? true : false;
    return this.fb.group({
      checked: new FormControl(checked),
      name: new FormControl(name),
      hours: new FormControl({
        value: hours,
        disabled: !checked,
      }),
      minutes: new FormControl({
        value: minutes,
        disabled: !checked,
      }),
    });
  }

  resetData() {
    this.dataForm = this.fb.group({
      content: this.fb.array([]),
    });
    let dataArray = <FormArray>this.dataForm.get('content');
    this.configData.forEach((element) => {
      dataArray.push(this.createItem(element.name, undefined, undefined));
    });
  }
}
