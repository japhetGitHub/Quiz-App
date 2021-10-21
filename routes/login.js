const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');


module.exports = (db) => {
  router.post('/', (req, res) => {

    const retrieveUserQuery = 'SELECT id AS user_id FROM users WHERE username=$1';

    db.query(retrieveUserQuery, [req.body.user_id])
      .then(data => {
        const user = data.rows[0];
        if (user) {
          req.session.user_id = user.user_id;
          return res.redirect('/');
        } else {
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
    console.log("in login / get");
    res.render('login');
  });
  return router;
};
