export interface User {
    userName: string;
    token: string;
    isAdmin: boolean;
  }
  
  export interface UserRegisterInfo {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }