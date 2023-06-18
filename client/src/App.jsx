import axios from "axios";
import AppRoutes from "./AppRoutes";
import { UserContextProvider } from "./UserContext";

// "http://localhost:6969/api/v2"
// "https://api-tipo-app.vercel.app/api/v2/"
function App() {
  axios.defaults.baseURL = "https://api-tipo-app.vercel.app/api/v2/";

  return (
    <UserContextProvider>
      <AppRoutes />
    </UserContextProvider>
  );
}

export default App;
