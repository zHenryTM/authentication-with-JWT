const mongoose = require("./../database/db")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre("save", async function(next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})

module.exports = mongoose.model("User", userSchema)