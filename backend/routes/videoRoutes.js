const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

// Get all videos
router.get('/', (req, res) => {
    db.all('SELECT * FROM videos', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(rows);
    });
});

// Get a specific video by ID
router.get('/:id', (req, res) => {
    const videoId = req.params.id;
    db.get('SELECT * FROM videos WHERE id = ?', [videoId], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (!row) {
            res.status(404).send('Video not found');
            return;
        }
        res.json(row);
    });
});

// Add a new video
router.post('/', (req, res) => {
    const { title, url } = req.body;
    db.run('INSERT INTO videos (title, url) VALUES (?, ?)', [title, url], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json({ id: this.lastID, title, url });
    });
});

// Update a video by ID
router.put('/:id', (req, res) => {
    const videoId = req.params.id;
    const { title, url } = req.body;
    db.run('UPDATE videos SET title = ?, url = ? WHERE id = ?', [title, url, videoId], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json({ id: videoId, title, url });
    });
});

// Delete a video by ID
router.delete('/:id', (req, res) => {
    const videoId = req.params.id;
    db.run('DELETE FROM videos WHERE id = ?', [videoId], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json({ message: 'Video deleted', changes: this.changes });
    });
});

module.exports = router;