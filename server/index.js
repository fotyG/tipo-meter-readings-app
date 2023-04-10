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
const tipoERouter = require("./routes/readings/tipoElectricity")
const tipoGRouter = require("./routes/readings/tipoGas")
const tipoWRouter = require("./routes/readings/tipoWater")
const tipoE48865026Router = require("./routes/readings/tipoE48865026")
const tipoE32878714Router = require("./routes/readings/tipoE32878714")
const tipoE0281935Router = require("./routes/readings/tipoE0281935")
const tipoE0282274Router = require("./routes/readings/tipoE0282274")
const tipoE0281679Router = require("./routes/readings/tipoE0281679")
const tipoE0282269_33067590Router = require("./routes/readings/tipoE0282269_33067590")
const tipoE0281803Router = require("./routes/readings/tipoE0281803")
const tipoE0281748Router = require("./routes/readings/tipoE0281748")
const tipoE0281934Router = require("./routes/readings/tipoE0281934")
const tipoE042268Router = require("./routes/readings/tipoE042268")
const tipoE0882410Router = require("./routes/readings/tipoE0882410")
const tipoE327544Router = require("./routes/readings/tipoE327544")
const tipoE0282299Router = require("./routes/readings/tipoE0282299")
const tipoE004165Router = require("./routes/readings/tipoE004165")
const tipoESanitexRouter = require("./routes/readings/tipoESanitex")
const majaERouter = require("./routes/readings/majaElectricity")
const majaGRouter = require("./routes/readings/majaGas")
const majaWRouter = require("./routes/readings/majaWater")
const majaKRouter = require("./routes/readings/majaKontroles")
const mazgatavaERouter = require("./routes/readings/mazgatavaElectricity")
const mazgatavaWRouter = require("./routes/readings/mazgatavaWater")
const mazgatavaKRouter = require("./routes/readings/mazgatavaKontroles")

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
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.get("/api/v1/profile", authenticateUser, (req, res) => {
  const { name, userId } = req.user
  res.json({name, userId})
})

app.post("/api/v1/logout", (req, res) => {
  res.clearCookie("token", {httpOnly: true})
  res.status(200).json({ msg: "logged out successfully" })
})

// Routes
app.use("/api/v1/auth", authRouter)
app.use(
  "/api/v1/readings",
  authenticateUser,
  tipoERouter,
  tipoGRouter,
  tipoWRouter,
  tipoE48865026Router,
  tipoE32878714Router,
  tipoE0281935Router,
  tipoE0282274Router,
  tipoE0281679Router,
  tipoE0282269_33067590Router,
  tipoE0281803Router,
  tipoE0281748Router,
  tipoE0281934Router,
  tipoE042268Router,
  tipoE0882410Router,
  tipoE327544Router,
  tipoE0282299Router,
  tipoE004165Router,
  tipoESanitexRouter,
  majaERouter,
  majaGRouter,
  majaWRouter,
  majaKRouter,
  mazgatavaERouter,
  mazgatavaWRouter,
  mazgatavaKRouter,
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
