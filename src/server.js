import 'dotenv/config';
import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import  connectDB  from './config/db.js';
import {socketAuth}  from './middlewares/authMiddleware.js';
import { registerSocketHandlers } from './socket/socketHandler.js';

const PORT = process.env.PORT || 5000;

connectDB();

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.use(socketAuth);

io.on('connection', (socket) => {
  registerSocketHandlers(io, socket);
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});