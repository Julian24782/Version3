const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./database.db');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Get all accounts
app.get('/api/accounts', (req, res) => {
    db.all('SELECT * FROM accounts', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

// Create a new account
app.post('/api/accounts', (req, res) => {
    const { username, saldo } = req.body;
    db.run('INSERT INTO accounts (username, saldo) VALUES (?, ?)', [username, saldo], function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ id: this.lastID, username, saldo });
        }
    });
});

// Update an account
app.put('/api/accounts/:id', (req, res) => {
    const { id } = req.params;
    const { username, saldo } = req.body;
    db.run('UPDATE accounts SET username = ?, saldo = ? WHERE id = ?', [username, saldo, id], function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ id, username, saldo });
        }
    });
});

// Delete an account
app.delete('/api/accounts/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM accounts WHERE id = ?', id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ id });
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
