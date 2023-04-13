require("dotenv").config()
const helmet = require("helmet")
const cors = require("cors")
const express = require("express")
const cookieParser = require("cookie-parser")
const authenticateUser = require("./middleware/authentication")
const app = express()
const port = process.env.PORT || 5000
const clientUrl = process.env.CLIENT_URL

// Routers
const authRouter = require("./routes/auth")
const metersRouter = require("./routes/meter")
const readingsRouter = require("./routes/reading")

// DB connect
const connectDB = require("./db/connect")

// Middleware
app.use(cookieParser())
app.use(express.json())
app.use(helmet())
app.use(cors({credentials: true, origin: clientUrl}))
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", clientUrl)
  next()
})

// Error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Profile routes
app.get("/api/v2/profile", authenticateUser, (req, res) => { 
  const { name, userId } = req.user
  res.json({ name, userId })
})

app.post("/api/v2/logout", (req, res) => {
  res.clearCookie("token")
  res.status(200).json({ msg: "logged out successfully" })
})

// Routes
app.use("/api/v2/auth", authRouter)
app.use(
  "/api/v2/",
  authenticateUser,
  metersRouter,
  readingsRouter,
) 

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// Server listen
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()

module.exports = app
