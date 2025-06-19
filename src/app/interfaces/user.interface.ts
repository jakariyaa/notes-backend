export interface IUser {
  name: string;
  age: number;
  email: string;
  password: string;
  avatar: string;
  role: "user" | "admin";
  address: IUserAddress;
}

export interface IUserAddress {
  street: string;
  city: string;
  zip: number;
}

export interface UserInstanceMethods {
  hashPassword(): void;
}
