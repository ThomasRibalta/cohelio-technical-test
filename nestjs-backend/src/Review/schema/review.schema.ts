import { Schema, Document } from 'mongoose';
import { User } from '../../users/schema/user.schema';

export const ReviewSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  content: { type: String, required: true },
  rate: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export interface Review extends Document {
  client: string | User;
  type: string;
  content: string;
  rate: number;
  createdAt: Date;
}
