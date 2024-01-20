const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

// Define routes for the '/users' endpoint
router.get('/', (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(rows);
    });
});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    db.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (!row) {
            res.status(404).send('User not found');
            return;
        }
        res.json(row);
    });
});

// Add a new user
router.post('/', (req, res) => {
    const { name, email } = req.body;
    db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json({ id: this.lastID, name, email });
    });
});

// Update a user by ID
router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json({ id: userId, name, email });
    });
});

// Delete a user by ID
router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    db.run('DELETE FROM users WHERE id = ?', [userId], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json({ message: 'User deleted', changes: this.changes });
    });
});

router.get('/:id/favorites', (req, res) => {
    const userId = req.params.id;
    db.all('SELECT videos.* FROM videos INNER JOIN favorites ON videos.id = favorites.video_id WHERE favorites.user_id = ?', [userId], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(rows);
    });
});

router.post('/:id/favorites', (req, res) => {
    const userId = req.params.id;
    const { video_id } = req.body;

    // Insert the favorite relationship directly
    const insertQuery = 'INSERT INTO favorites (user_id, video_id) VALUES (?, ?)';
    db.run(insertQuery, [userId, video_id], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Check if any rows were affected by the insert operation
        if (this.changes === 0) {
            res.status(404).send('User or Video not found');
            return;
        }

        res.json({ user_id: userId, video_id: video_id });
    });
});

router.delete('/:userId/favorites/:videoId', (req, res) => {
    const userId = req.params.userId;
    const videoId = req.params.videoId;
    db.run('DELETE FROM favorites WHERE user_id = ? AND video_id = ?', [userId, videoId], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json({ message: 'Favorite deleted', changes: this.changes });
    });
});

module.exports = router;