const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors module
const fs = require('fs'); // Import fs module
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors()); // Enable cors for all routes

let db = require('./db.json');

app.get('/financialHistory', (req, res) => {
    res.status(200).json(db.financialHistory);
});

app.post('/financialHistory', (req, res) => {
    const { userId, type, amount, description } = req.body;

    if (!userId || !type || !amount || !description) {
        res.status(400).json({ message: 'Faltan propiedades obligatorias en la solicitud' });
    } else {
        const newEntry = {
            id: db.financialHistory.length + 1,
            userId,
            type,
            amount,
            description
        };

        db.financialHistory.push(newEntry);

        fs.writeFile('./db.json', JSON.stringify(db), (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error al escribir en el archivo db.json' });
            } else {
                res.status(201).json(newEntry);
            }
        });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
