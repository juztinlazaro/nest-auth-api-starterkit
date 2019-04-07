import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  authId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    default: '',
  },
  last_name: {
    type: String,
    default: '',
  },
  avatar: {
    type: Object,
    default: {},
  },
  mobile_number: {
    type: Number,
    default: 0,
  },
});
