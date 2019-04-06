import * as mongoose from 'mongoose';

export const VerificationTokenSchema = new mongoose.Schema({
  authId: {
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
