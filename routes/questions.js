const express = require('express');
const router  = express.Router();

module.exports = (db) => {


  router.get("/:id/data", (req, res) => {
    let query = `SELECT * FROM questions
    WHERE quiz_id = $1
    ORDER BY questions.id`; // add: ORDER BY questions.id
    //console.log(query);
    db.query(query, [req.params.id])
      .then(data => {
        const questions = data.rows;
        //console.log(questions);
        res.json({ quiz: questions });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/:id", (req, res) => {
    let id = req.params.id;
    res.render("quiz", { id });
  });

  router.post("/:id", (req, res) => {
    const user_answers = req.body.user_answers;
    //console.log(user_answers)

    user_answers.map((attempt) => {
      const {correct, question_id, quiz_attempt_id} = attempt;
      const sqlQuery = `INSERT INTO question_attempts (correct, question_id, quiz_attempt_id) VALUES ($1, $2, $3) RETURNING *`
      db.query(sqlQuery, [correct, question_id, quiz_attempt_id])
        .then((response) => {
          if (response.rows[0]) console.log("attempt inserted", response.rows[0])
        })
        .catch(error => console.log(error))
    })


    res.status(200).json("Data Inserted");

  })
  // router post /:id    **REMEMBER: this POST req has the user_answers in the req.body***
    //const q_attempt_id= INSERT INTO quiz_attempts VALUES (quiz_id=req.param, user_id, attempt_link) RETURNING ID

    //const q_ids[] = SELECT questions.id from questions with quiz_id = req.param order by questions.id

    //LOOP
      // INSERT INTO question_attempts (correct=user_answers[i], question_id=q_ids[i], quiz_attempt_id=q_attempt_id)
  return router;
};
