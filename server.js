const express = require('express');
const app = express();
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server now listening on port ${port}`);
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api', async (request, response) => {
    const request_text = request.body.text;
    console.log(`passed text: ${request_text}`);
    const fetch_response = await fetch('https://pandoc.bilimedtech.com/html', {
    method: 'POST',
    headers: {
        'Content-Type': 'text/markdown'
    },
    body: `${request_text}`
    });

    const string_response = await fetch_response.body._readableState.buffer.head.data.toString();
    console.log(string_response);
    response.json(string_response);
});