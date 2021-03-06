export interface ISignUpResponse {
  statusCode: number;
  message: string;
  data?: {
    _id?: string;
    email?: string;
    username?: string;
  };
}
