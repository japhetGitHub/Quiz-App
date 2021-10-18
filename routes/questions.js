const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT question, choice_1, choice_2, choice_3, choice_4 FROM questions`;
    console.log(query);
    db.query(query)
      .then(data => {
        const questions = data.rows;
        console.log(questions);
        res.render("quiz", { quiz: questions });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
