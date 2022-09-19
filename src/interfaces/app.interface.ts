export interface DataArray {
  checked?: boolean;
  name: string;
  hours: number | undefined;
  minutes: number | undefined;
}

export interface InsertTimeSheetRequest{
  date:string;
  data:DataArray[],
  user:string,
  timezone: string;
}

export interface Config {
  _id: string;
  name: string;
  isActive: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface ConfigResponse {
  code: number;
  data: Config[];
}

export interface TimeSheet {
  hours: number;
  minutes: number;
  name: string;
}

export interface GetTimeSheetInterface{
    date: string;
    timezone: string;
    user: string;
}

export interface TimeSheetResponse {
  code: number;
  data: TimeSheet[];
}
