import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

const Modal = ({ closeModal, skaititajs, editMode, chosenReading }) => {
  const [readingPH, setReadingPH] = useState("rādījums")
  const [reading, setReading] = useState("")
  const [clientPH, setClientPH] = useState("")
  const [client, setClient] = useState("")
  const [consumption, setConsumption] = useState(0)
  const [type, setType] = useState()
  const [property, setProperty] = useState("")
  const [location, setLocation] = useState("")
  const [meter, setMeter] = useState("")
  const [ cookies, setCookie, removeCookie ] = useCookies()

  let url
  let axiosUrl

  if (editMode) {
    url = `${skaititajs}/${chosenReading}`
    axiosUrl = `/readings/${skaititajs}/${chosenReading}`
  } else {
    url = `${skaititajs}/latest`
    axiosUrl = `/readings/${skaititajs}`
  }
  useEffect(() => {
    const fetchReadingData = async () => {
      try {
        const response = await axios.get(`/readings/${url}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        editMode
          ? setReadingPH(response.data.reading)
          : setReadingPH(response.data.latest.reading)
        editMode
          ? setReading(response.data.reading)
          : setReading(response.data.latest.reading)
        editMode
          ? setClientPH(response.data.client || "-")
          : setClientPH(response.data.latest.client || "-")
        editMode
          ? setClient(response.data.client || "")
          : setClient(response.data.latest.client || "")

        editMode
          ? setType(response.data.type)
          : setType(response.data.latest.type)
        editMode
          ? setProperty(response.data.property || "")
          : setProperty(response.data.latest.property || "")
        editMode
          ? setLocation(response.data.pavilion || "")
          : setLocation(response.data.latest.pavilion || "")
        editMode
          ? setMeter(response.data.meter || "")
          : setMeter(response.data.latest.meter || "")
      } catch (error) {
        console.log(error)
      }
    }
    fetchReadingData()
  }, [url])

  const handleReadingChange = (e) => {
    const newReading = e.target.value
    setReading(newReading)
    setConsumption(newReading - readingPH)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editMode) {
        const request = await axios.patch(
          `${axiosUrl}`,
          {
            property,
            type,
            pavilion: location,
            meter,
            reading,
            client,
          },
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        )
        if (request) {
          closeModal()
        }
      } else {
        const request = await axios.post(
          `${axiosUrl}`,
          {
            property,
            type,
            pavilion: location,
            meter,
            reading,
            client,
          },
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        )
        if (request) {
          closeModal()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="absolute bg-black bg-opacity-50 top-0 left-0 w-screen h-screen flex items-center justify-center">
      <div className="relative bg-violet-50 bg-opacity-100 w-1/3 rounded-lg shadow-lg p-4 mb-20">
        <button className="absolute top-0 right-3" onClick={closeModal}>
          x
        </button>
        <div className="flex p-3 justify-center">
          <form className="text-teal-950">
            <h3 className="block text-center m-2 font-bold">
              {editMode ? "Rādījuma labošana" : "Jaunais rādījums"}
            </h3>
            <div className="flex justify-between items-center">
              <label htmlFor="radijums">Rādījums:</label>
              <input
                id="radijums"
                className="text-center m-2 p-1 rounded outline-violet-400"
                type="number"
                min="0"
                placeholder={readingPH}
                value={reading}
                onChange={handleReadingChange}
              />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="klients">Klients:</label>
              <input
                id="klients"
                className="block text-center m-2 p-1 rounded outline-violet-400"
                type="text"
                placeholder={clientPH}
                value={client}
                onChange={(e) => setClient(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="paterins">Patērīņš:</label>
              <input
                disabled
                readOnly
                className="block text-center m-2 p-1 rounded"
                type="text"
                placeholder={consumption}
                value={consumption}
              />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="tips">Tips:</label>
              <input
                disabled
                readOnly
                className="block text-center m-2 p-1 rounded"
                type="text"
                placeholder={type}
                value={type}
              />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="objekts">Objekts:</label>
              <input
                disabled
                readOnly
                className="block text-center m-2 p-1 rounded"
                type="text"
                placeholder={property}
                value={property}
              />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="lokacija">Lokācija:</label>
              <input
                disabled
                readOnly
                className="block text-center m-2 p-1 rounded"
                type="text"
                placeholder={location}
                value={location}
              />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="skaititajaNr">Skaitītāja Nr.</label>
              <input
                disabled
                readOnly
                className="block text-center m-2 p-1 rounded"
                type="text"
                placeholder={meter}
                value={meter}
              />
            </div>
            <button
              className="block mx-auto border border-teal-950 px-3 py-1 rounded-md text-teal-950 hover:bg-purple-300 transition-all shadow-md mt-3"
              onClick={(e) => handleSubmit(e)}
            >
              {editMode ? "Labot Rādījumu" : "Iesniegt"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Modal
