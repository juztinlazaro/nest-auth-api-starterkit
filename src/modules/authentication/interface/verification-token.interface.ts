export interface IVerificationTokenResponse {
  statusCode: number;
  message: string;
  data?: {
    email?: string;
    token?: string;
  };
}
