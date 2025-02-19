import { Schema, model, Types, Document, InferSchemaType } from 'mongoose';
import { reactionSchema, IReaction } from './Reaction.js';

// Safe timestamp formatter
const formatTimestamp = (timestamp: Date) => timestamp.toISOString();

// Thought Schema
const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: { type: Date, default: Date.now, get: formatTimestamp },
    username: { type: String, required: true },
    reactions: { type: [reactionSchema], default: [], _id: false }
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

// **Infer Type from Schema** ✅
type IThought = InferSchemaType<typeof thoughtSchema>;

// Thought Model
const Thought = model<IThought>('Thought', thoughtSchema);
export default Thought;
