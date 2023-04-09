const User = require("../models/User")
const jwt = require("jsonwebtoken")

const auth = async (req,res,next) => {
  const token = req.cookies.token
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = {name: payload.username, userId: payload.userId}
    next()
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" })
  }
}

module.exports = auth