import bcrypt from 'bcrypt';

export async function findUserByUsername(db, username) {
  return db.get('SELECT * FROM users WHERE username = ?', [username]);
}

export async function createUser(db, username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
}
