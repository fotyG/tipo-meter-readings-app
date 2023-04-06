import RegisterLogin from "./RegisterLogin"
import Dashboard from "./Dashboard"
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom"


const AppRoutes = () => {
  
  return ( <>
    <Routes>
      <Route path="/" element={<RegisterLogin/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
 </> )
}
export default AppRoutes
