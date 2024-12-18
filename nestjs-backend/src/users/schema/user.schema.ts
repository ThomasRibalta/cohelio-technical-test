import mongoose, { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user' },
});

export interface User extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}
