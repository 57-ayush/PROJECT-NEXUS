import {Channel} from '../models/channel.model.js';
import {Message} from '../models/message.model.js';

export const registerSocketHandlers = (io, socket) => {
  console.log(`Socket connected: ${socket.id} (user: ${socket.user.username})`);

  socket.on('join_room', async (channelId) => {
    try {
      const channel = await Channel.findById(channelId);

      if (!channel) {
        return socket.emit('error_message', { message: 'Channel not found' });
      }

      const isMember = channel.members.some(
        (memberId) => memberId.toString() === socket.user._id.toString()
      );

      if (!isMember) {
        return socket.emit('error_message', { message: 'You are not a member of this channel' });
      }

      socket.join(channelId);
      console.log(`${socket.user.username} joined room ${channelId}`);

      socket.emit('joined_room', { channelId });
    } catch (err) {
      console.error(err);
      socket.emit('error_message', { message: 'Server error joining room' });
    }
  });

  socket.on('send_message', async ({ channelId, content, attachmentUrl }) => {
    try {
      if (!content && !attachmentUrl) {
        return socket.emit('error_message', { message: 'Message must have content or an attachment' });
      }

      const isInRoom = socket.rooms.has(channelId);
      if (!isInRoom) {
        return socket.emit('error_message', { message: 'You must join the room before sending messages' });
      }

      const message = await Message.create({
        senderId: socket.user._id,
        channelId,
        content,
        attachmentUrl,
      });

      io.to(channelId).emit('message_received', {
        _id: message._id,
        senderId: socket.user._id,
        username: socket.user.username,
        channelId,
        content,
        attachmentUrl,
        createdAt: message.createdAt,
      });
    } catch (err) {
      console.error(err);
      socket.emit('error_message', { message: 'Server error sending message' });
    }
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id} (user: ${socket.user.username})`);
  });
};