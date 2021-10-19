const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    let query = `SELECT * FROM questions
    WHERE quiz_id = $1`;
    //console.log(query);
    db.query(query, [req.params.id])
      .then(data => {
        const questions = data.rows;
        //console.log(questions);
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
