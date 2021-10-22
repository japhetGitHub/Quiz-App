const express = require('express');
const router = express.Router();
function generateRandomString() {
  return Math.random().toString(36).substr(2, 6);
}
module.exports = (db) => {

  router.get("/:id/data", (req, res) => {
    let query = `SELECT * FROM questions
    WHERE quiz_id = $1
    ORDER BY questions.id`; // add: ORDER BY questions.id
    db.query(query, [req.params.id])
      .then(data => {
        const questions = data.rows;
        res.json({ quiz: questions });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.get("/:link", (req, res) => {

    let query = `SELECT id AS quiz_id FROM quizzes
    WHERE quiz_link = $1`;
    db.query(query, [req.params.link])
      .then(data => {
        const id = data.rows[0].quiz_id;
        res.render("quiz", { id, loggedIn: true });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });


  });


  router.post("/:id", (req, res) => {
    //console.log("this is session", req.session.user_id)
    const attempt_link = generateRandomString();
    const user_id = req.session.user_id;
    console.log('**user_id**:', user_id);
    const quiz_id = req.params.id;
    const quizAttemptsQuery = `INSERT INTO quiz_attempts (attempt_link, user_id, quiz_id) VALUES ($1, $2, $3) RETURNING quiz_attempts.id`

    db.query(quizAttemptsQuery, [attempt_link, user_id, quiz_id])
      .then((response) => {
        const quiz_attempt_id = response.rows[0].id;
        const user_answers = req.body.user_answers;

        return Promise.all(user_answers.map((attempt) => {
          const { correct, question_id } = attempt;
          const sqlQuery = `INSERT INTO question_attempts (correct, question_id, quiz_attempt_id) VALUES ($1, $2, $3) RETURNING *`

          return db.query(sqlQuery, [correct, question_id, quiz_attempt_id])}))
        })

      .then((responses) => {
        //console.log("these are responses", responses);
        if (responses[0].rows[0]) {

          const quiz_attempt_id = responses[0].rows[0].quiz_attempt_id;
          //console.log("inserted attempt: ", quiz_attempt_id)
          console.log(responses[0].rows[0]);
          res.json({attempt_link})
        } else {
          res.send("empty")
        }
      })


      .catch(error => {
        console.log("OUTER ERROR");
        res.json({error});
      })

  });

  return router;
};
