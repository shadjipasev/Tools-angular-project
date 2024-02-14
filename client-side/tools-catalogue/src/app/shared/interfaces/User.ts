export interface IUser {
  _id: string;
  username: string;
  email: string;
  role: string;
  cart: Array<string>;
}
