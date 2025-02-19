import { Schema, model, Types } from 'mongoose';

// User Schema
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      match: [/.+@.+\..+/, 'Must be a valid email address']
    },
    thoughts: [{ type: Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: Types.ObjectId, ref: 'User' }]
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
const User = model('User', userSchema);
export default User;
