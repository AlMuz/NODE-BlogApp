module.exports = (req, res, next) => {
  if (
      !req.file ||
      !req.body.title ||
      !req.body.description ||
      !req.body.content ||
      !req.body.username
    ) {
      return res.redirect('/post/new');
  }
  next();
}
