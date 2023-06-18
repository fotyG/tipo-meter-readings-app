import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { BounceLoader } from "react-spinners";
import axios from "axios";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

const RegisterLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginOrRegister, setLoginOrRegister] = useState("login");
  const [cookies, setCookie, removeCookie] = useCookies();
  const {
    setUsername: setLoggedInUsername,
    setIsLoggedIn,
    isLoggedIn,
    token,
    setToken,
    authToken,
  } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "auth/login";
    //const url = loginOrRegister === "register" ? "auth/register" : "auth/login"
    try {
      setIsLoading(true);
      const response = await axios.post(url, { username, password });

      //setToken(response.data.token)
      setLoggedInUsername(response.data.user.name);
      setCookie("token", response.data.token, {
        path: "/",
        maxAge: 60 * 60,
        secure: true,
      });
      setToken(response.data.token);
      setIsLoggedIn(true);

      setUsername("");
      setPassword("");
      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };
  isLoggedIn && navigate("/dashboard");
  return (
    <>
      <div className="bg-slate-300 h-screen flex items-center">
        <form
          className="w-64 mx-auto mb-20 bg-slate-100 p-4 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <h3 className="block w-full text-center mb-4 text-slate-900">
            Laipni lūgti!
          </h3>
          <input
            type="text"
            placeholder="Lietotājvārds"
            className="block w-full p-2 mb-4 rounded-md text-slate-950 outline-slate-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Parole"
            className="block w-full p-2 mb-4 rounded-md text-slate-950 outline-slate-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isError && (
            <p className="text-sm text-center mb-2 text-red-500">
              Nepareizi dati
            </p>
          )}
          <button
            disabled={isLoading}
            className={
              "block w-full bg-slate-300 p-2 mb-2 rounded-md text-slate-900 hover:bg-slate-400 transition-all hover:text-white" +
              (isLoading ? " cursor-not-allowed" : "")
            }
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <BounceLoader
                  className="mr-2"
                  size={20}
                  color="black"
                />
                Apstrāde...
              </div>
            ) : (
              "Pieslēgties"
            )}

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
  );
};
export default RegisterLogin;
