require("dotenv").config()

const router = require("express").Router()
const User = require("./../models/User")
const path = require("path")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const auth = require("./../middlewares/auth")
const logout = require("./../middlewares/logout")
const knowUser = require("./../middlewares/knowUser")

router.get("/", logout, (req, res) => res.sendFile(path.join(__dirname, "../views/index.html")))
router.get("/create/user", (req, res) => res.sendFile(path.join(__dirname, "../views/createUser.html")))
router.get("/login/user", (req, res) => res.sendFile(path.join(__dirname, "../views/loginUSer.html")))
router.get("/settings", auth, knowUser, (req, res) => res.send("You're on a private route, congrats! :D"))  // private route.

router.post("/create/user", async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email})

        if (user) return res.send("Error, user already exists!")

        user = await new User({...req.body}).save()
        
        const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.cookie("token", token)
        res.redirect("/settings")
        
    } catch(err) {
        console.log("Something went wrong... " + err)
    }
})

router.post("/login/user", async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email}, "+password")

        if(!user) return res.send("Error! User does not exist!")

        if(!await bcrypt.compare(req.body.password, user.password)) return res.send("Error! Invalid password!")

        const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.cookie("token", token)
        res.redirect("/settings")

    } catch(err) {
        console.log("Something went wrong... " + err)
    }
})

module.exports = app => app.use(router)