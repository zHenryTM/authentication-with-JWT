const express = require("express")
const cookieParser = require("cookie-parser")

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

require("./controllers/userController")(app)

app.listen(3000, () => console.log("Server started on port 3000."))

