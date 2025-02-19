import { Schema, model, Types, Document } from 'mongoose';
import reactionSchema from './Reaction';

// Define Thought Interface
interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Types.DocumentArray<typeof reactionSchema>; // ✅ FIXED
}

// Thought Schema
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: { 
      type: Date, 
      default: Date.now, 
      get: (timestamp: any) => new Date(timestamp).toLocaleString() 
    },
    username: { type: String, required: true },
    reactions: { type: [reactionSchema], default: [] } // ✅ Ensuring it's an array
  },
  {
    toJSON: { virtuals: true, getters: true },
    id: false
  }
);

// Virtual: Get reaction count
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Thought Model
const Thought = model<IThought>('Thought', thoughtSchema);
export default Thought;
