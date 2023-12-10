"use strict";

const app = require("express")();
const images = require("./src/images.json");

const randomInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

app.get("/images", ({ query }, res) => {
  const limit = query.limit ? parseInt(query.limit) : 10;
  const offset = query.offset ? parseInt(query.offset) : 0;

  const i = limit ? images.slice(offset || 0, limit + offset) : images;

  setTimeout(() => {
    return res.status(200).json(i);
  }, randomInterval(500, 1500));
});

app.listen(5000, () => {
  process.stdout.write("Server is available on http://localhost:5000/\n");
});
