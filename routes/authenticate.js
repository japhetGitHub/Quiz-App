module.exports = () => (req, res, next) => {

  const whiteListRoutes = ['/login'];
  const path = req.path;

  if (whiteListRoutes.includes(path)) { // if path is /login
    if(req.session['user_id']) { // if user has a session
      return res.redirect('/');
    } else {
      return next(); // if user has a session then let them through
    }
  } else { // for every other path
    if(req.session['user_id']) { // if user has a session
      return next(); // let them through
    } else {
      return res.redirect('/login'); // if user doesn't have a session then don't let them through
    }
  }

};
