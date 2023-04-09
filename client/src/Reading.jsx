import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import {
  BsBoxArrowLeft,
  BsFileEarmarkText,
  BsPlusCircle,
  BsTrash,
  BsPencil,
} from "react-icons/bs"

const Reading = ({
  skaititajs,
  url,
  handleMeterClick,
  handleAddNewReadingOrEdit,
  openDeleteModal,
  notifyReadingDelete,
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

  const formatDate = (dateData) => {
    const isoDateString = dateData
    const date = new Date(isoDateString)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = String(date.getFullYear()).slice(-2)
    const formattedDate = `${day}.${month}.${year}.`
    return formattedDate
  }

  const getReading = useCallback(async () => {
    try {
      const data = await axios.get(`/readings/${skaititajs}/${url}`)
      if (url === "") {
        const array = await data.data.readings
        // loop through the array and calculate the consumption for each reading
        const readingsWithConsumption = array.map((reading, index) => {
          const consumption =
            index < array.length - 1
              ? reading.reading - array[index + 1].reading
              : 0
          return { ...reading, consumption }
        })
        setReadingArr(readingsWithConsumption)
      } else {
        const formattedDate = formatDate(data.data.latest.createdAt)
        setDate(formattedDate)
        setReading(data.data.latest.reading)
        setConsumption(data.data.latest.reading - data.data?.previous?.reading)
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
      console.log(error.message)
    }
  }, [skaititajs, url])

  useEffect(() => {
    getReading()
  }, [handleAddNewReadingOrEdit, getReading, notifyReadingDelete])

  if (url === "") {
    return readingArr.map((result) => {
      const formattedDate = formatDate(result.createdAt)
      const id = result._id
      return (
        <div
          key={result._id}
          className="grid grid-cols-9 p-2 text-teal-950 text-center hover:bg-violet-100 transition-all"
        >
          <p className="">{formattedDate}</p>
          <p className="">{result.reading}</p>
          <p className="">{result.consumption}</p>
          <p className="">{result.client === "" ? "-" : result.client}</p>
          <p className="">{result.type}</p>
          <p className="">{result.property}</p>
          <p className="">{result.pavilion === "" ? "-" : result.pavilion}</p>
          <p className="">{result.meter === "" ? "-" : result.meter}</p>{" "}
          <div className="flex justify-end px-4 gap-2">
            {readingArr[0]._id === result._id && (
              <button
                className="hover:text-violet-800"
                title="Pievienot jaunu rādījumu"
                onClick={() => handleAddNewReadingOrEdit(skaititajs)}
              >
                <BsPlusCircle />
              </button>
            )}
            <button
              className="hover:text-violet-800"
              title="Atgriezties pie visiem skaitītājiem"
              onClick={() => handleMeterClick(skaititajs)}
            >
              <BsBoxArrowLeft />
            </button>
            <button
              className="hover:text-violet-800"
              title="Labot rādījumu"
              onClick={() => handleAddNewReadingOrEdit(skaititajs, id)}
            >
              <BsPencil />
            </button>
            <button
              className="hover:text-violet-800"
              title="Dzēst rādījumu"
              onClick={() => openDeleteModal(skaititajs, id)}
            >
              <BsTrash />
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
      <div className="flex justify-end px-4 gap-2">
        <button
          className="hover:text-violet-800"
          title="Visi skaitītāja rādījumi"
          onClick={() => handleMeterClick(skaititajs)}
        >
          <BsFileEarmarkText />
        </button>
        <button
          className="hover:text-violet-800"
          title="Pievienot jaunu rādījumu"
          onClick={() => handleAddNewReadingOrEdit(skaititajs)}
        >
          <BsPlusCircle />
        </button>
        <button
          className="hover:text-violet-800"
          title="Labot rādījumu"
          onClick={() => handleAddNewReadingOrEdit(skaititajs, readingId)}
        >
          <BsPencil />
        </button>
        <button
          className="hover:text-violet-800"
          title="Dzēst rādījumu"
          onClick={() => openDeleteModal(skaititajs, readingId)}
        >
          <BsTrash />
        </button>
      </div>
    </div>
  )
}
export default Reading
