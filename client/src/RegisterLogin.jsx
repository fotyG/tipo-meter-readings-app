import { useContext, useState } from "react"
import { UserContext } from "./UserContext"
import axios from "axios"
import { useNavigate } from "react-router"

const RegisterLogin = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isError, setIsError] = useState(false)
  const [loginOrRegister, setLoginOrRegister] = useState("login")
  const {
    setUsername: setLoggedInUsername,
    username: loggedInUser,
    setIsLoggedIn,
    isLoggedIn,
  } = useContext(UserContext)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = loginOrRegister === "register" ? "auth/register" : "auth/login"
    try {
      const response = await axios.post(url, { username, password })
      setLoggedInUsername(response.data.user.name)
      
      setUsername("")
      setPassword("")
      setIsLoggedIn(true)
    } catch (error) {
      setIsError(true)
      console.log(error)
    }
  }
  isLoggedIn && navigate("/dashboard")
  return (
    <>
      <div className="bg-blue-100 h-screen flex items-center">
        <form
          className="w-64 mx-auto mb-20 bg-blue-50 p-4 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <h3 className="block w-full text-center mb-4 text-blue-900">
            Welcome!
          </h3>
          <input
            type="text"
            placeholder="username"
            className="block w-full p-2 mb-4 rounded-md text-blue-950 outline-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="password"
            className="block w-full p-2 mb-4 rounded-md text-blue-950 outline-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isError && <p className="text-sm text-center mb-2 text-red-500">Nepareizi dati</p>}
          <button className="block w-full bg-blue-300 p-2 mb-2 rounded-md text-blue-900 hover:bg-blue-400 transition-all">
            {loginOrRegister === "register" ? "Register" : "Login"}
          </button>
          <div className="text-center mt-2">
            {loginOrRegister === "register" && (
              <div className="text-sm text-blue-950">
                Already a member?
                <button
                  className="ml-1 text-sm text-blue-500"
                  onClick={() => setLoginOrRegister("login")}
                >
                  Login here
                </button>
              </div>
            )}
            {loginOrRegister === "login" && (
              <div className="text-sm text-blue-950">
                Don't have an account?
                <button
                  className="ml-1 text-sm text-blue-500"
                  onClick={() => setLoginOrRegister("register")}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  )
}
export default RegisterLogin
