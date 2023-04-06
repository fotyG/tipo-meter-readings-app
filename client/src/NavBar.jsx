import { NavLink } from "react-router-dom"
import { UserContext } from "./UserContext"
import { useContext } from "react"

const NavBar = () => {
  const { username: loggedInUser, logout } = useContext(UserContext)
  return (
    <div className="bg-purple-300 h-14 flex items-center gap-2">
      <p className="text-sm p-2 ml-2 text-teal-950">Sveiki, {loggedInUser}</p>
      <button to="/iesniegt" className="border border-white px-2 py-1 rounded-md text-white hover:bg-purple-500 transition-all" onClick={logout}>
        Izrakstīties
      </button>
    </div>
  )
}
export default NavBar
