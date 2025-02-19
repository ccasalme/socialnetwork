import { Schema, model, Types, Document } from 'mongoose';

// Define User Interface
interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[];
  friends: Types.ObjectId[]; // ✅ Fix TypeScript complaint
}

// User Schema
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      match: [/.+@.+\..+/, 'Must be a valid email address']
    },
    thoughts: [{ type: Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: Types.ObjectId, ref: 'User' }] // ✅ Fix TypeScript complaint
  },
  {
    toJSON: { virtuals: true },
    id: false
  }
);

// Virtual: Get friend count
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// User Model
const User = model<IUser>('User', userSchema);
export default User;
