const express = require('express');
const http = require('http');

const app = express();
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const server = app.listen(5000, () => {
    console.log('Server is running on port 5000, running smoke test...');
    http.get('http://localhost:5000', (res) => {
        if (res.statusCode === 200) {
            console.log('Smoke test passed.');
            server.close();
            process.exit(0);
        } else {
            server.close();
            process.exit(1);
        }
    }).on('error', (err) => {
        console.error('Error during smoke test:', err);
        server.close();
        process.exit(1);
    });
});

