import { createContext, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

export const UserContext = createContext({})

export const UserContextProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState(null)
  const [id, setId] = useState(null)
  const navigate = useNavigate()

  const logout = async () => {
    const response = await axios.post("/logout")
    console.log(response)
    setUsername(null)
    setId(null)
    setIsLoggedIn(false)
    navigate("/")
  }

  useEffect(()=>{
    const getProfile = async () => {
      const response = await axios.get("/profile")
      const { name, userId } = response.data
      setIsLoggedIn(true)
      setId(userId)
      setUsername(name)
    }
    getProfile()
  },[])

  return (
    <UserContext.Provider value={{username, setUsername, id, setId, isLoggedIn, setIsLoggedIn, logout}} >
      {children}
    </UserContext.Provider>
  )
}