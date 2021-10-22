const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    db.query(`SELECT title, quizzes.owner_id, quiz_link, users.username FROM quizzes INNER JOIN users ON quizzes.owner_id = users.id;`)
      .then(data => {
        const quiz = data.rows;
        res.json({ quiz });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
