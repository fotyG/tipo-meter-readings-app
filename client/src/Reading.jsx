import axios from "axios"
import { useEffect, useState } from "react"
import { BsBoxArrowLeft, BsFileEarmarkText, BsPlusCircle } from "react-icons/bs"

const Reading = ({
  skaititajs,
  url,
  handleMeterClick,
  handleAddNewReading,
}) => {
  const [date, setDate] = useState("-")
  const [reading, setReading] = useState("-")
  const [consumption, setConsumption] = useState("-")
  const [client, setClient] = useState("-")
  const [type, setType] = useState("-")
  const [property, setProperty] = useState("-")
  const [location, setLocation] = useState("-")
  const [meter, setMeter] = useState("-")
  const [readingId, setReadingId] = useState("")
  const [readingArr, setReadingArr] = useState([])

  useEffect(() => {
    const getReading = async () => {
      try {
        const data = await axios.get(`/readings/${skaititajs}/${url}`)
        if (url === "") {
          const array = await data.data.readings
          setReadingArr(array)
        } else {
          const isoDateString = data.data.latest.createdAt
          const date = new Date(isoDateString)
          const day = String(date.getDate()).padStart(2, "0")
          const month = String(date.getMonth() + 1).padStart(2, "0")
          const year = String(date.getFullYear()).slice(-2)
          const formattedDate = `${day}.${month}.${year}.`
          setDate(formattedDate)
          setReading(data.data.latest.reading)
          setConsumption(
            data.data.latest.reading - data.data?.previous?.reading
          )
          setClient(
            data.data.latest.client === "" ? "-" : data.data.latest.client
          )
          setType(data.data.latest.type)
          setProperty(data.data.latest.property)
          setLocation(
            data.data.latest.pavilion === "" ? "-" : data.data.latest.pavilion
          )
          setMeter(data.data.latest.meter === "" ? "-" : data.data.latest.meter)
          setReadingId(data.data.latest._id)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getReading()
  }, [handleAddNewReading])

  if (url === "") {
    return readingArr.map((result) => {
      const isoDateString = result.createdAt
      const date = new Date(isoDateString)
      const day = String(date.getDate()).padStart(2, "0")
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const year = String(date.getFullYear()).slice(-2)
      const formattedDate = `${day}.${month}.${year}.`
      return (
        <div
          key={result._id}
          className="grid grid-cols-9 p-2 text-teal-950 text-center hover:bg-violet-100 transition-all"
        >
          <p className="">{formattedDate}</p>
          <p className="" onClick={(e) => console.log(e)}>
            {result.reading}
          </p>
          <p className="">{result.consumption}</p>
          <p className="">{result.client}</p>
          <p className="">{result.type}</p>
          <p className="">{result.property}</p>
          <p className="">{result.pavilion}</p>
          <p className="">{result.meter}</p>
          <div>
            <button
              className="hover:text-violet-800"
              title="Atgriezties pie visiem skaitītājiem"
              onClick={() => handleMeterClick(skaititajs)}
            >
              <BsBoxArrowLeft />
            </button>
          </div>
        </div>
      )
    })
  }
  return (
    <div
      key={readingId}
      className="grid grid-cols-9 p-2 text-teal-950 text-center hover:bg-violet-100 transition-all"
    >
      <p className="">{date}</p>
      <p className="">{reading}</p>
      <p className="">{consumption}</p>
      <p className="">{client}</p>
      <p className="">{type}</p>
      <p className="">{property}</p>
      <p className="">{location}</p>
      <p className="">{meter}</p>
      <p className="">
        <button
          className="hover:text-violet-800 mx-2"
          title="Visi skaitītāja rādījumi"
          onClick={() => handleMeterClick(skaititajs)}
        >
          <BsFileEarmarkText />
        </button>
        <button
          className="hover:text-violet-800"
          title="Pievienot jaunu rādījumu"
          onClick={() => handleAddNewReading(skaititajs)}
        >
          <BsPlusCircle />
        </button>
      </p>
    </div>
  )
}
export default Reading
