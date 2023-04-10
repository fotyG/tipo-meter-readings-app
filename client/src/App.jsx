import axios from "axios"
import AppRoutes from "./AppRoutes"
import { UserContextProvider } from "./UserContext"

function App() {
  axios.defaults.baseURL = "http://localhost:6969/api/v1/"
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <AppRoutes />
    </UserContextProvider>
  )
}

export default App
