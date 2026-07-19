import Channel from '../models/channel.model.js';

// @route  POST /api/channels
export const createChannel = async (req, res) => {
  try {
    const { name, type } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Channel name is required' });
    }

    const channel = await Channel.create({
      name,
      type: type || 'public',
      members: [req.user._id],
    });

    res.status(201).json(channel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating channel' });
  }
};

// @route  GET /api/channels
export const getMyChannels = async (req, res) => {
  try {
    const channels = await Channel.find({ members: req.user._id }).sort({ updatedAt: -1 });

    res.status(200).json(channels);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching channels' });
  }
};