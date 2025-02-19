import { Schema, model, Types, Document } from 'mongoose';
import reactionSchema from './Reaction';

// Define Thought Interface
interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Types.DocumentArray<Types.Subdocument>;
}

// Thought Schema
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: { 
      type: Date, 
      default: Date.now, 
      get: function (this: { createdAt: Date }): string {
        return this.createdAt instanceof Date 
          ? this.createdAt.toLocaleString() 
          : new Date(this.createdAt).toLocaleString();
      }
    } as any,
    username: { type: String, required: true },
    reactions: { 
      type: [reactionSchema], 
      default: () => [] // ✅ FIXED Subdocument Array
    }
  },
  {
    toJSON: { virtuals: true, getters: true },
    id: false
  }
);

// Virtual: Get reaction count
thoughtSchema.virtual('reactionCount').get(function (this: { reactions: any[] }) {
  return this.reactions ? this.reactions.length : 0;
});

// Thought Model
const Thought = model<IThought>('Thought', thoughtSchema);
export default Thought;
