module.exports = () => (req, res, next) => {

  const whiteListRoutes = ['/login',];
  const path = req.path;

  if (!whiteListRoutes.includes(path)) { // if path is not /login
    if(!req.session['user_id']) { // if user doesn't have a session
      return res.redirect('/login'); // redirect invalid/logged-out user to /login
    } else {
      return next(); // if user has a session then let them through
    }
  } else {
    return next();
  }
};
