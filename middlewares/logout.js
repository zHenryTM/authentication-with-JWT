module.exports = (req, res, next) => {
    const { token } = req.cookies

    if(!token) {
        next()
    } else {
        res.clearCookie("token")
        next()
    }
}