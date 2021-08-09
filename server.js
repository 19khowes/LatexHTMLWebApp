const express = require('express');
const app = express();
const fetch = require('node-fetch');
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server now listening on port ${port}`);
});

app.use(express.static('public'));
