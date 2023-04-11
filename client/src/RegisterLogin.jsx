import { useContext, useState } from "react"
import { UserContext } from "./UserContext"
import axios from "axios"
import { useNavigate } from "react-router"
import { useCookies } from "react-cookie"

const RegisterLogin = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isError, setIsError] = useState(false)
  const [loginOrRegister, setLoginOrRegister] = useState("login")
  const [cookies, setCookie, removeCookie] = useCookies()
  const {
    setUsername: setLoggedInUsername,
    setIsLoggedIn,
    isLoggedIn,
    token,
    setToken,
    authToken,
  } = useContext(UserContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = "auth/login"
    //const url = loginOrRegister === "register" ? "auth/register" : "auth/login"
    try {
      const response = await axios.post(
        url,
        { username, password },
      )
      
      //setToken(response.data.token)
      setLoggedInUsername(response.data.user.name)
      setCookie("token", response.data.token, {path: "/", maxAge: 60*60})
      setToken(response.data.token)
      setIsLoggedIn(true)
      
      setUsername("")
      setPassword("")
      navigate("/dashboard")
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
            Laipni lūgti!
          </h3>
          <input
            type="text"
            placeholder="lietotājvārds"
            className="block w-full p-2 mb-4 rounded-md text-blue-950 outline-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="parole"
            className="block w-full p-2 mb-4 rounded-md text-blue-950 outline-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isError && (
            <p className="text-sm text-center mb-2 text-red-500">
              Nepareizi dati
            </p>
          )}
          <button className="block w-full bg-blue-300 p-2 mb-2 rounded-md text-blue-900 hover:bg-blue-400 transition-all">
            Pieslēgties
            {/* {loginOrRegister === "register" ? "Reģistrēties" : "Pieslēgties"} */}
          </button>
          {/* <div className="text-center mt-2">
            {loginOrRegister === "register" && (
              <div className="text-sm text-blue-950">
                Jau ir profils?
                <button
                  className="ml-1 text-sm text-blue-500"
                  onClick={() => setLoginOrRegister("login")}
                >
                  Pierakstīties šeit
                </button>
              </div>
            )}
            {loginOrRegister === "login" && (
              <div className="text-sm text-blue-950">
                Nav profila?
                <button
                  className="ml-1 text-sm text-blue-500"
                  onClick={() => setLoginOrRegister("register")}
                >
                  Reģistrēties
                </button>
              </div>
            )}
          </div> */}
        </form>
      </div>
    </>
  )
}
export default RegisterLogin
