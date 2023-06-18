import axios from "axios";
import AppRoutes from "./AppRoutes";
import { UserContextProvider } from "./UserContext";

function App() {
  axios.defaults.baseURL =
    "http://localhost:6969/api/v2" || "https://api-tipo-app.vercel.app/api/v2/";

  return (
    <UserContextProvider>
      <AppRoutes />
    </UserContextProvider>
  );
}

export default App;
