module.exports = {
    checkNotLogin: function (req,res,next) {
        if (!req.session.user) {
            return res.redirect('/api/sigin')
        }
        next()
    }
}