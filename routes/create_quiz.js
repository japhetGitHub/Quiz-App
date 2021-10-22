/*
 * All routes for Creating a Quiz are defined here
 * Since this file is loaded in server.js,
 *   these routes are mounted onto /quiz/new
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
    res.render('create_quiz', { loggedIn: true }); // loggedIn flag disables/enables navbar logout button
  });

  /**
   * ROUTE: POST /quiz/new
   * DESCRIPTION: Create new quiz
   */
  router.post("/", (req, res) => {

    const quizQuery = { // inserts quiz table data
      text: 'INSERT INTO quizzes (title, public, quiz_link, owner_id) VALUES ($1, $2, $3, $4) RETURNING id, title, quiz_link;',
      values: [req.body.quizTitle, req.body.isPublic, generateRandomString(), 2]
    }
    db.query(quizQuery)
    .then(data => {
      // data.rows[0] is the return value of the INSERT quizQuery above
      const quiz_id = data.rows[0].id;
      const quiz_title = data.rows[0].title;
      const quiz_link = data.rows[0].quiz_link;

      Promise.all(req.body.questions.map(question => { // resolves all the promises of the array of questions
        const { questionText, correct, choices } = question;

        const questionQuery = { // inserts question table data
          text: 'INSERT INTO questions (question, correct_answer, choice_1, choice_2, choice_3, choice_4, quiz_id) VALUES ($1, $2, $3, $4, $5, $6, $7);',
          values: [questionText, `choice_${correct}`, choices.choice_1, choices.choice_2, choices.choice_3, choices.choice_4, quiz_id]
        };
        db.query(questionQuery);
      }))

      return { quiz_title, quiz_link: `${req.get('host')}/quiz/${quiz_link}` }; // builds the shareable link dynamically from the request host (from req header) and quiz link (from db return)
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
