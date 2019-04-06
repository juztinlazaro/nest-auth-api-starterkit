export interface IUserModel {
  user_id: string;
  auth_id: string;
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  avatar?: object;
  mobile_number?: number;
}
