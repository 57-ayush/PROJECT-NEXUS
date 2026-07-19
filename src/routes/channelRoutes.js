import express from 'express';
import { createChannel, getMyChannels } from '../controllers/channelController.js';
import { sendMessage, getMessages } from '../controllers/messageController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createChannel);
router.get('/', protect, getMyChannels);

router.post('/:channelId/messages', protect, sendMessage);
router.get('/:channelId/messages', protect, getMessages);

export default router;