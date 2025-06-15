import fp from 'fastify-plugin';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { CREATE_SQL as PLAYER_SQL } from '../models/players.js';
import { CREATE_USER_SQL } from '../models/users.js';

export default fp(async function (fastify, opts) {
  const db = await open({
    filename: './data.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(PLAYER_SQL);
  await db.exec(CREATE_USER_SQL);

  fastify.decorate('sqlite', db);
});
