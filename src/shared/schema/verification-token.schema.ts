import * as mongoose from 'mongoose';

export const VerificationTokenSchema = new mongoose.Schema({
  verificationId: {
    type: String,
    required: true,
  },
  auth_id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Number,
  },
});
