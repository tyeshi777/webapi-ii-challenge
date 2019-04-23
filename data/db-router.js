const express = require("express");

const Db = require("./db.js");

const router = express.Router();

router.get("/", (req, res) => {
  Db.find()
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res
        .status(500)
        .res.json({ err: "The posts information could not be retrieved" });
    });
});

module.exports = router;
