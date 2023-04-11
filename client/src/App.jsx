import axios from "axios"
import AppRoutes from "./AppRoutes"
import { UserContextProvider } from "./UserContext"

function App() {
  axios.defaults.baseURL = "https://api-tipo-app.vercel.app/api/v1/"
  

  return (
    <UserContextProvider>
      <AppRoutes />
    </UserContextProvider>
  )
}

export default App
