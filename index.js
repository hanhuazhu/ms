const fs = require("node:fs");

const express = require("express");
const app = express();
const PORT = 3000;

let database = "";
fs.readFile('./data.json', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return; 
  }
  database = JSON.parse(data);
});

app.get("/", (req, res) => {
  let data = database.questions;
  if (req.query.subject) {
    data = data.filter(
      (obj) => obj.subject.toLowerCase() === req.query.subject.toLowerCase());
  }
  res.json(data.slice(req.query.offset, req.query.limit));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
})
