const express = require("express");

const dbRouter = require("./data/db-router.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h2>Lambda Posts API</h2>
    <p>Welcome to the Lambda Posts API</p>
  `);
});

server.use("/api/posts", dbRouter);

module.exports = server;
