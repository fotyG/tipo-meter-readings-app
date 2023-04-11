const User = require("../models/User")
const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1]
    //console.log(token)
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { name: decodedToken.username, userId: decodedToken.userId }
    next()
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" })
  }
}

module.exports = auth
