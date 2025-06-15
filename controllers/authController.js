import * as userService from '../services/userService.js';
import * as playerService from '../services/playerService.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // bcrypt de eksik olabilir

const JWT_SECRET = 'supersecretkey';

export async function registerHandler(request, reply) {
  const { username, password } = request.body;

  const existingUser = await userService.findUserByUsername(request.server.sqlite, username);
  if (existingUser) {
    return reply.code(400).send({ error: 'Username already exists' });
  }

  // Kullanıcıyı users tablosuna kaydet
  await userService.createUser(request.server.sqlite, username, password);
  
  // Aynı kullanıcıyı players tablosuna da 0 skor ile kaydet
  await playerService.createPlayerForUser(request.server.sqlite, username);
  
  return reply.code(201).send({ message: 'User and player registered successfully' });
}

export async function loginHandler(request, reply) {
  const { username, password } = request.body;

  const user = await userService.findUserByUsername(request.server.sqlite, username);
  if (!user) {
    return reply.code(401).send({ error: 'Invalid username or password' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return reply.code(401).send({ error: 'Invalid username or password' });
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return reply.send({ token });
}
