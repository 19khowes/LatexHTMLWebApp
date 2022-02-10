const { text } = require("express");
const express = require("express");
const res = require("express/lib/response");
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

  console.log(`request text: \n${request_text}`);
  // const fetch_response = await fetch("https://pandoc.bilimedtech.com/html", options);
  // const string_response = await fetch_response.body._readableState.buffer.head.data.toString();

  let raw = `${request_text}`;

  let requestOptions = {
    method: 'POST',
    headers: {
      "Content-Type": "text/latex"
    },
    body: raw,
    redirect: 'follow'
  };

  let textResponse;
  fetch("https://pandoc.bilimedtech.com/html", requestOptions)
  .then(pandocResponse => pandocResponse.text())
  .then(result => {
    // textResponse = result;
    console.log(typeof result);
    console.log(result);
    response.json(result);
  })
  .catch(error => console.log('error', error));


  // const re = /\$(.*)\$/g;
  // let edited_text = request_text.replace(re, '\\($1\\)');
  // console.log(request_text);
  // pandoc.convert('latex', request_text, ['html'], (result, err) => {
  //     // console.log(result.html);
  //     response.json(result.html);
  // });
});