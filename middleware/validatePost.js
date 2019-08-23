module.exports = (req, res, next) => {

  postErrors = [];

  if (!req.file) {
    postErrors.push("You need to upload file!");
  }

  if (!req.body.title) {
    postErrors.push("You need to write posts title");
  }

  if (!req.body.description) {
    postErrors.push("You need to write posts description");
  }

  if (!req.body.content) {
    postErrors.push("You need to write posts content");
  }

  if (postErrors.length > 0) {
    req.flash('postErrors', postErrors);
    req.flash('data', req.body);
    return res.redirect('/post/new');
  }

  next();
}
