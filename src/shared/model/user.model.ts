export interface IUserModel {
  userId: string;
  authId: string;
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  avatar?: object;
  mobile_number?: number;
}
