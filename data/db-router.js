const express = require("express");
const Joi = require("joi");

const Db = require("./db.js");

const router = express.Router();

router.get("/", (req, res) => {
  Db.find()
    .then(post => {
      res.status(201).json({
        messageOfTheDay: process.env.MOTD,
        post
      });
    })
    .catch(err => {
      res
        .status(500)
        .res.json({ err: "The posts information could not be retrieved" });
    });
});

router.post("/", (req, res) => {
  const schema = {
    title: Joi.string().required(),
    contents: Joi.string().required()
  };
  const postBody = Joi.validate(req.body, schema);
  console.log("post body", postBody);
  if (postBody.error) return res.status(400).json(postBody.error.message);

  Db.insert(postBody.value)
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
  // const post = posts.find(post => post.id === parseInt(req.params.id));
  const postId = parseInt(req.params.id);
  if (!postId)
    return res
      .status(404)
      .json({ errorMessage: "The post with specified id does not exist" });

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
