// import sqlite3 module
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create and connect to the SQLite database
const dbPath = path.resolve(__dirname, 'data.db');
const db = new sqlite3.Database(dbPath);

// Create a table for users
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
    )
  `);

  // Create a table for YouTube videos
  db.run(`
    CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      url TEXT
    )
  `);

  // Create a table for favorites (relationship between users and videos)
  db.run(`
    CREATE TABLE IF NOT EXISTS favorites (
      user_id INTEGER,
      video_id INTEGER,
      PRIMARY KEY (user_id, video_id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (video_id) REFERENCES videos(id)
    )
  `);

  // Seed data function
  const seedData = () => {
    const initialUsers = [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Doe', email: 'jane@example.com' },
      // Add more initial users as needed
    ];

    const initialVideos = [
      { title: 'Video 1', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { title: 'Video 2', url: 'https://www.youtube.com/watch?v=xm3YgoEiEDc' },
      // Add more initial videos as needed
    ];

    const initialFavorites = [
      { user_id: 1, video_id: 1 },
      { user_id: 2, video_id: 2 },
      // Add more initial favorites as needed
    ];

    const insertUser = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
    const insertVideo = db.prepare('INSERT INTO videos (title, url) VALUES (?, ?)');
    const insertFavorite = db.prepare('INSERT INTO favorites (user_id, video_id) VALUES (?, ?)');

    initialUsers.forEach((user) => {
      insertUser.run(user.name, user.email);
    });

    initialVideos.forEach((video) => {
      insertVideo.run(video.title, video.url);
    });

    initialFavorites.forEach((favorite) => {
      insertFavorite.run(favorite.user_id, favorite.video_id);
    });

    insertUser.finalize();
    insertVideo.finalize();
    insertFavorite.finalize();
  };

  // Seed the data if the users, videos, and favorites tables are empty
  db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
    if (err) {
      console.error(err.message);
      return;
    }

    if (row.count === 0) {
      seedData();
      console.log('Database seeded with initial data');
    }
  });
});

module.exports = db;