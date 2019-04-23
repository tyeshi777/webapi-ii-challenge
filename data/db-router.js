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
  if (!req.body.title && req.body.contents) {
    res
      .status(400)
      .json({ errorMessage: "Please provide title and contents for the post" });
  }
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

router.delete("/:id", (req, res) => {
  const postId = req.params.id;
  Db.remove(postId)
    .then(deleted => {
      res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({ err: "The post cannot be removed" });
    });
});

router.put("/:id", (req, res) => {
  const postId = req.params.id;
  const postBody = req.body;

  Db.update(postId, postBody)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({ err: "The post information cannot be modified" });
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
