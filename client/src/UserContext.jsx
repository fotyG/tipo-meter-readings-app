import { createContext, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"
import { useCookies } from "react-cookie"

export const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState(null)
  const [id, setId] = useState(null)
  const navigate = useNavigate()
  const [token, setToken] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.token

  const logout = async () => {
    const response = await axios.post("/logout")
    setUsername(null)
    setId(null)
    setIsLoggedIn(false)
    setToken(null)
    removeCookie("token")
    //axios.defaults.headers["Authorization"] = null // Clear the Authorization header
    navigate("/")
  }

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get("/profile", {
          headers: {
            Authorization: `Bearer ${cookies.token}`
          }
        })
        const { name, userId } = response.data
        setIsLoggedIn(true)
        setId(userId)
        setUsername(name)
      } catch (error) {
        console.log(error)
        setUsername(null)
        setId(null)
        setIsLoggedIn(false)
        navigate("/")
      }
    }
    getProfile()
  }, [isLoggedIn, cookies])

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        id,
        setId,
        isLoggedIn,
        setIsLoggedIn,
        logout,
        token,
        setToken,
        authToken,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
