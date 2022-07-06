require("dotenv").config
const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
    const auth = req.cookies.token

    if(!auth) return res.send("You're not allowed to access this page. Please, authenticate yourself!")

    jwt.verify(auth, process.env.JWT_SECRET, (err) => {
        if(err) return res.send("Invalid Token!")

        next()
    })
}