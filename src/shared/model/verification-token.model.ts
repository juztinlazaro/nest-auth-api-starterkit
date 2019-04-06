export interface IVerificationTokenModel {
  verificationId: string;
  auth_id: string;
  email: string;
  expirationDate?: number;
}
