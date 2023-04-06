import axios from "axios"
import { useEffect, useState } from "react"
import NavBar from "./NavBar"
import ReadingContainer from "./ReadingContainer"
import CreateReading from "./CreateReading"

const Dashboard = () => {
  const [readings, setReadings] = useState([])
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
    <NavBar/>
    <ReadingContainer/>
      {/* {readings.map((reading) => {
        return <p key={reading._id}>{reading.location}</p>
      })} */}
    </>
  )
}
export default Dashboard