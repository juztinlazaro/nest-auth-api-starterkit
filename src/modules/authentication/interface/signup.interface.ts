export interface ISignUpResponse {
  statusCode: number;
  message: string;
  data?: {
    email?: string;
    username?: string;
  };
}
