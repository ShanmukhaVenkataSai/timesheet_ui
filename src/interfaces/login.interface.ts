export interface Login {
  username: string;
  password: string;
}

export interface Signup extends Login {
  email: string;
  confirmPassword: string;
}

export interface LoginData {
  username: string;
  email: string;
  _id: string;
  accesstoken: string;
}

export interface LoginResponse {
  code: number;
  data: LoginData;
}
