import { Schema, Types, InferSchemaType } from 'mongoose';

// Safe timestamp formatter
const formatTimestamp = (timestamp: Date) => timestamp.toISOString();

// Reaction Schema
const reactionSchema = new Schema(
  {
    reactionId: { type: Types.ObjectId, default: () => new Types.ObjectId() },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, get: formatTimestamp }
  },
  {
    toJSON: { getters: true },
    id: false
  }
);

// **Infer Type from Schema** ✅
type IReaction = InferSchemaType<typeof reactionSchema>;

export { reactionSchema, IReaction };
