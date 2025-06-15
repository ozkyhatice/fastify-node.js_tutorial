// middlewares/verifyJWT.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'supersecretkey';

export function verifyJWT(request, reply, done) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    reply.code(401).send({ error: 'No token provided' });
    return done(new Error('No token provided'));
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    request.user = decoded;
    done();
  } catch (err) {
    reply.code(401).send({ error: 'Invalid token' });
    return done(new Error('Invalid token'));
  }
}

export function validatePlayer(request, reply, done) {
  const { name, score } = request.body;

  if (!name || typeof name !== 'string') {
    return reply.code(400).send({ error: 'Name is required and must be a string.' });
  }

  if (typeof score !== 'number') {
    return reply.code(400).send({ error: 'Score must be a number.' });
  }

  done();
}
