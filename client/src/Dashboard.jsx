import axios from "axios"
import { useEffect, useState } from "react"
import NavBar from "./NavBar"
import ReadingContainer from "./ReadingContainer"


const Dashboard = () => {

  useEffect(()=>{
    // const getData = async() => {
    //   const result = await axios.get("/readings")
    //   // console.log(result.data.readings)
    //   setReadings(result.data.readings)
    // }
    // getData()
  },[])
  return (
    <>
      <NavBar />
      <ReadingContainer />
    </>
  )
}
export default Dashboard