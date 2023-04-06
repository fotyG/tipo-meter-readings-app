import axios from "axios"
import { useEffect, useState } from "react"

const Reading = ({skaititajs}) => {
  const [date, setDate] = useState("-")
  const [reading, setReading] = useState("-")
  const [consumption, setConsumption] = useState("-")
  const [client, setClient] = useState("-")
  const [type, setType] = useState("-")
  const [property, setProperty] = useState("-")
  const [location, setLocation] = useState("-")
  const [meter, setMeter] = useState("-")
  const [readingId, setReadingId] = useState("")
  
  useEffect(()=>{
    const getReading = async () => {
      try {
        const data = await axios.get(`/readings/${skaititajs}/latest`)
        const isoDateString = data.data.latest.createdAt
        const date = new Date(isoDateString)
        const day = String(date.getDate()).padStart(2, "0")
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const year = String(date.getFullYear()).substr(2)
        const formattedDate = `${day}.${month}.${year}.`
        setDate(formattedDate)
        setReading(data.data.latest.reading)
        setConsumption(data.data.latest.reading - data.data?.previous?.reading)
        setClient(data.data.latest.client === ""? "-": data.data.latest.client)
        setType(data.data.latest.type)
        setProperty(data.data.latest.property)
        setLocation(
          data.data.latest.pavilion === "" ? "-" : data.data.latest.pavilion
        )
        setMeter(data.data.latest.meter === "" ? "-" : data.data.latest.meter)
        setReadingId(data.data.latest._id)
      } catch (error) {
        console.log(error);
      }
    }
    getReading()
  },[])
  return (
    <div id={readingId} className="grid grid-cols-8 p-2 text-teal-950 text-center hover:bg-violet-100 transition-all">
      <p className="">{date}</p>
      <p className="">{reading}</p>
      <p className="">{consumption}</p>
      <p className="">{client}</p>
      <p className="">{type}</p>
      <p className="">{property}</p>
      <p className="">{location}</p>
      <p className="">{meter}</p>
    </div>
  )
}
export default Reading