export interface IAuthenticationModel {
  auth_id: string;
  username: string;
  email: string;
  password: string;
  isVerified?: boolean;
}
