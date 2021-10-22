const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post('/', (req, res) => {

    const retrieveUserQuery = 'SELECT id AS user_id FROM users WHERE username=$1';

    db.query(retrieveUserQuery, [req.body.username]) // query db for given username
      .then(data => {
        const user = data.rows[0];
        if (user) {
          req.session.user_id = user.user_id;
          return res.redirect('/');
        } else { // user is undefined when no matching user was found
          return res.redirect('/login');
        }

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  router.get("/", (req, res) => {
    res.render('login' , { loggedIn: false });
  });

  return router;
};
