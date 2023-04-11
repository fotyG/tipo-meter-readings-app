
const User = require("../models/User")
const { StatusCodes } = require("http-status-codes")
const { BadRequestError, UnauthenticatedError } = require("../errors")

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res
      .status(StatusCodes.CREATED)
      .json({ user: { name: user.username }, token })
  } catch (error) {
    res.json({msg: "Registering Unsuccessful"})
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      throw new BadRequestError("Please provide email and password")
    }
    const user = await User.findOne({ username })
    if (!user) {
      throw new UnauthenticatedError("Invalid Credentials")
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials")
    }
    const token = user.createJWT()
    res
      .status(StatusCodes.OK)
      .json({ user: { name: user.username }, token })
  } catch (error) {
    res.json({msg: error})
  }
}

module.exports = { register, login }
