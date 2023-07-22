function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).send("Must init Session");
    }
};

module.exports = {
    isAuthenticated
};