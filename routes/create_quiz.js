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
    res.render('create_quiz');
  });

  /**
   * ROUTE: POST /quiz/new
   * DESCRIPTION: Create new quiz
   */
  router.post("/", (req, res) => {
    // console.log('in the backend');

    // TO DO:
    // CHANGE owner_id to get value from session/cookie
    const query = {
      text: 'INSERT INTO quizzes (title, public, quiz_link, owner_id) VALUES ($1, $2, $3, $4) RETURNING id, title, quiz_link;',
      values: [req.body.quizTitle, req.body.isPublic, generateRandomString(), 2]
    }
    db.query(query)
    .then(data => {
      console.log(data);
      res.json(data.rows[0]);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });


  return router;
};
