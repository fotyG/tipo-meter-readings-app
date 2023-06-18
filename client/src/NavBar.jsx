import { NavLink } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";

const NavBar = () => {
  const { username: loggedInUser, logout } = useContext(UserContext);
  return (
    <div className="bg-slate-100 h-14 flex items-center gap-2 shadow-md">
      <p className="text-sm p-2 ml-2 text-teal-950">Sveiki, {loggedInUser}</p>
      <button
        to="/iesniegt"
        className="border border-black px-2 py-1 rounded-md text-black hover:bg-slate-600 hover:text-white transition-all"
        onClick={logout}
      >
        Izrakstīties
      </button>
    </div>
  );
};
export default NavBar;
