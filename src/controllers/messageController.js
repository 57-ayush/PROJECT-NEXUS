import {Message} from '../models/message.model.js';
import {Channel} from '../models/channel.model.js';

// @route  POST /api/channels/:channelId/messages
export const sendMessage = async (req, res) => {
  try {
    const { channelId } = req.params;
    const { content, attachmentUrl } = req.body;

    if (!content && !attachmentUrl) {
      return res.status(400).json({ message: 'Message must have content or an attachment' });
    }

    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    const isMember = channel.members.some(
      (memberId) => memberId.toString() === req.user._id.toString()
    );
    if (!isMember) {
      return res.status(403).json({ message: 'You are not a member of this channel' });
    }

    const message = await Message.create({
      senderId: req.user._id,
      channelId,
      content,
      attachmentUrl,
    });

    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error sending message' });
  }
};

// @route  GET /api/channels/:channelId/messages
export const getMessages = async (req, res) => {
  try {
    const { channelId } = req.params;

    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    const isMember = channel.members.some(
      (memberId) => memberId.toString() === req.user._id.toString()
    );
    if (!isMember) {
      return res.status(403).json({ message: 'You are not a member of this channel' });
    }

    const messages = await Message.find({ channelId }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching messages' });
  }
};