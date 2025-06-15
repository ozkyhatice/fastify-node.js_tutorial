export async function getAllPlayers(db) {
    return db.all('SELECT * FROM players');
  }
  
  export async function createPlayer(db, name, score) {
    return db.run('INSERT INTO players (name, score) VALUES (?, ?)', [name, score]);
  }

  export async function createPlayerForUser(db, username) {
    return db.run('INSERT INTO players (name, score) VALUES (?, ?)', [username, 0]);
  }
  