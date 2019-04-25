const express = require("express");

const dbRouter = require("./data/db-router.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h2>Lambda Posts Heroku</h2>
    <p>Welcome to the Lambda Posts Heroku</p>
  `);
});

server.use("/api/posts", dbRouter);

module.exports = server;
