const express = require('express');
const path = require('path');
const app = express();
const HOST = '0.0.0.0';
const PORT = 9000;

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) =>
    res.sendFile(path.resolve(__dirname + '/../dist/index.html'))
);

app.listen(PORT, HOST);

console.log(`Express server running on ${HOST}:${PORT}`);
