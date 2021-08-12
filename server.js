const express = require("express");
const app = express();
const fetch = require("node-fetch");
// const pdc = require('pdc');
// const pandoc = require('pandoc');
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server now listening on port ${port}`);
});

app.use(express.static("public"));
app.use(express.json());

app.post("/api", async (request, response) => {
  const request_text = request.body.text;
  console.log(`request text: ${request_text}`);
  const fetch_response = await fetch('https://pandoc.bilimedtech.com/html', {
  method: 'POST',
  headers: {
      'Content-Type': 'text/latex'
  },
  body: `${request_text}`
  });
  const string_response = await fetch_response.body._readableState.buffer.head.data.toString();
  console.log(`Response from pandoc: ${string_response}`);
  response.json(string_response);


  // const re = /\$(.*)\$/g;
  // let edited_text = request_text.replace(re, '\\($1\\)');
  // console.log(request_text);
  // pandoc.convert('latex', request_text, ['html'], (result, err) => {
  //     // console.log(result.html);
  //     response.json(result.html);
  // });
});
