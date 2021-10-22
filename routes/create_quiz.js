/*
 * All routes for Creating a Quz are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

//HELPER FUNCTION
const generateRandomString = () => Math.random().toString(36).substring(2, 8);

module.exports = (db) => {
  /**
   * ROUTE: GET /quiz/new
   * DESCRIPTION: Display form for new quiz
   */
  router.get("/", (req, res) => {

    // res.render() the EJS create new quiz form
    res.render('create_quiz', { loggedIn: true });
  });

  /**
   * ROUTE: POST /quiz/new
   * DESCRIPTION: Create new quiz
   */
  router.post("/", (req, res) => {

    const quizQuery = {
      text: 'INSERT INTO quizzes (title, public, quiz_link, owner_id) VALUES ($1, $2, $3, $4) RETURNING id, title, quiz_link;',
      values: [req.body.quizTitle, req.body.isPublic, generateRandomString(), 2]
    }
    db.query(quizQuery)
    .then(data => {
      const quiz_id = data.rows[0].id;
      const quiz_title = data.rows[0].title;
      const quiz_link = data.rows[0].quiz_link;

      Promise.all(req.body.questions.map(question => {
        const { questionText, correct, choices } = question;

        const questionQuery = {
          text: 'INSERT INTO questions (question, correct_answer, choice_1, choice_2, choice_3, choice_4, quiz_id) VALUES ($1, $2, $3, $4, $5, $6, $7);',
          values: [questionText, `choice_${correct}`, choices.choice_1, choices.choice_2, choices.choice_3, choices.choice_4, quiz_id]
        };
        db.query(questionQuery);
      }))

      return { quiz_title, quiz_link: `${req.get('host')}/quiz/${quiz_link}` };
    })
    .then((results) => {
      res.json(results); // sends the quiz_title and quiz_link
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });


  return router;
};
