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

router.post("/", (req, res) => {
  const postBody = req.body;

  Db.insert(postBody)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        err: "There was an error while saving the post to the database."
      });
    });
});

router.get("/:id", (req, res) => {
  const postId = req.params.id;
  Db.findById(postId)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({
        err: `The post with the specified id ${id} cannot be retrieved.`
      });
    });
});

module.exports = router;
