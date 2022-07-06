require("dotenv").config()

const jwt = require("jsonwebtoken")
const User = require("./../models/User")

module.exports = (req, res, next) => {
    
    const auth = req.cookies.token

    jwt.verify(auth, process.env.JWT_SECRET, async (err, decoded) => {
        if(err) return res.send("err");

        const user = await User.findById(decoded.id)

        console.log(user.name)

        next()
    })

}