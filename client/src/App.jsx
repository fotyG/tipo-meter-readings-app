import axios from "axios"
import AppRoutes from "./AppRoutes"
import { UserContextProvider } from "./UserContext"

function App() {
  axios.defaults.baseURL = "https://tipo-app-api.vercel.app/api/v1/"
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <AppRoutes />
    </UserContextProvider>
  )
}

export default App
