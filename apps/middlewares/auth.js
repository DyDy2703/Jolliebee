function requireAuth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.redirect(303, "/admin/login");
}

function redirectIfAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return res.redirect(303, "/");
  }
  return next();
}

function requireRole(role) {
  return (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === role) {
      return next();
    }

    if (req.path.startsWith("/api/")) {
      return res.status(403).json({ message: "Forbidden" });
    }

    return res.redirect(303, "/?error=forbidden");
  };
}

module.exports = {
  requireAuth,
  redirectIfAuthenticated,
  requireRole,
};
