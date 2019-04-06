import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  user_id: {
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
  username: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  avatar: {
    type: Object,
  },
  mobile_number: {
    type: Number,
  },
});
