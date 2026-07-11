import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
      required: true,
    },
    content: {
      type: String,
      trim: true,
    },
    attachmentUrl: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export const Message= mongoose.model('Message', messageSchema);