export interface DataArray {
  checked?: boolean;
  name: string;
  hours: number | undefined;
  minutes: number | undefined;
  date: string;
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
  createdAt: string;
  date: string;
  hours: number;
  minutes: number;
  name: string;
  timezone: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface TimeSheetResponse {
  code: number;
  data: TimeSheet[];
}
