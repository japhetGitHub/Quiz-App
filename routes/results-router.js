const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id/data", (req, res) => {
    let query = `SELECT * FROM question_attempts
    WHERE quiz_attempt_id = $1
    `; // add: ORDER BY questions.id
    db.query(query, [req.params.id])
      .then(data => {
        const result = data.rows;
        res.json({ results: result });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // router.get("/:id", (req, res) => {
  //   let id = req.params.id;
  //   res.render("results", { id });
  // });

  router.get("/:link", (req, res) => {

    let query = `SELECT id AS attempt_id FROM quiz_attempts
    WHERE attempt_link = $1`;
    db.query(query, [req.params.link])
      .then(data => {
        const id = data.rows[0].attempt_id;
        res.render("results", { id });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};
