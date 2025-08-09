import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';
import { Server } from 'socket.io';
import http from 'http';
import Message from './models/message.model.js';

dotenv.config();
console.log("🔑 Loaded GEMINI_API_KEY?", process.env.GEMINI_API_KEY ? "Yes" : "No");

connectDB().then(() => {
  const PORT = process.env.PORT || 4000;
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  const onlineUsers = {};

  io.on('connection', (socket) => {
    console.log('⚡ User connected:', socket.id);

    socket.on('join', ({ userId }) => {
      if (userId) {
        onlineUsers[userId] = socket.id;
        console.log(`✅ ${userId} joined (socket: ${socket.id})`);
      }
    });

    socket.on('send_message', async (data) => {
      const { senderId, receiverId, senderRole, receiverRole, text } = data;
      if (!senderId || !receiverId || !text.trim()) return;

      const message = await Message.create({
        senderId,
        receiverId,
        senderRole,
        receiverRole,
        text,
      });

      if (onlineUsers[receiverId]) {
        io.to(onlineUsers[receiverId]).emit('receive_message', message);
      }

      socket.emit('receive_message', message);
    });

    socket.on('disconnect', () => {
      for (const id in onlineUsers) {
        if (onlineUsers[id] === socket.id) {
          delete onlineUsers[id];
          console.log(`❌ ${id} disconnected`);
          break;
        }
      }
    });
  });

  server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
