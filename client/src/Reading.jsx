import axios from "axios"
import { useCallback, useContext, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import {
  BsBoxArrowLeft,
  BsFileEarmarkText,
  BsPlusCircle,
  BsTrash,
  BsPencil,
} from "react-icons/bs"
import { useNavigate } from "react-router"
import { UserContext } from "./UserContext"

const Reading = ({
  url,
  handleMeterClick,
  handleAddNewReadingOrEdit,
  openDeleteModal,
  notifyReadingDelete,
}) => {
  const {
    setUsername: setLoggedInUsername,
    setIsLoggedIn,
    setId,
  } = useContext(UserContext)
  const [readingArr, setReadingArr] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies()
  const navigate = useNavigate()

  const formatDate = (dateData) => {
    const isoDateString = dateData
    const date = new Date(isoDateString)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = String(date.getFullYear()).slice(-2)
    const formattedDate = `${day}.${month}.${year}.`
    return formattedDate
  }

  // const getReading = useCallback(async () => {
  //   try {
  //     const response = await axios.get(`/meters/${url}`, {
  //       headers: {
  //         Authorization: `Bearer ${cookies.token}`,
  //       },
  //     })
  //     if (url) {
  //       const array = response.data
  //       // loop through the array and calculate the consumption for each reading
  //       const readingsWithConsumption = array.map((reading, index) => {
  //         const consumption =
  //           index < array.length - 1
  //             ? reading.reading - array[index + 1].reading
  //             : 0
  //         return { ...reading, consumption }
  //       })
  //       setReadingArr(readingsWithConsumption)
  //     } else {
  //       setReadingArr(response.data)
  //     }
  //   } catch (error) {
  //     if (error.response.status === 401) {
  //       setLoggedInUsername(null)
  //       setId(null)
  //       setIsLoggedIn(false)
  //       navigate("/")
  //     } else {
  //       console.log(error)
  //     }
  //   }
  // }, [url])

  useEffect(() => {
    const getReading = async (req, res) => {
      try {
        const response = await axios.get(`/meters/${url}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        if (url) {
          const array = response.data
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
          setReadingArr(response.data)
        }
      } catch (error) {
        if (error.response.status === 401) {
          setLoggedInUsername(null)
          setId(null)
          setIsLoggedIn(false)
          navigate("/")
        } else {
          console.log(error)
        }
      }
    }
    getReading()
  }, [handleAddNewReadingOrEdit, notifyReadingDelete])
  
  // All readings for chosen meter
  if (url) {
    return readingArr.map((result) => {
      //console.log(result)
      const formattedDate = formatDate(result.createdAt)
      return (
        <div
          key={result._id}
          className="grid grid-cols-9 p-2 text-teal-950 text-center hover:bg-violet-100 transition-all"
        >
          <p className="">{formattedDate}</p>
          <p className="">{result.reading}</p>
          <p className="">{result.consumption}</p>
          <p className="">{result.client === "" ? "-" : result.client}</p>
          <p className="">{result.meterId.meterType}</p>
          <p className="">{result.meterId.location}</p>
          <p className="">
            {result.meterId.pavilion === "" ? "-" : result.meterId.pavilion}
          </p>
          <p className="">
            {result.meterId.meterNr === "" ? "-" : result.meterId.meterNr}
          </p>
          <div className="flex justify-end px-4 gap-2">
            {readingArr[0]._id === result._id && (
              <button
                className="hover:text-violet-800"
                title="Pievienot jaunu rādījumu"
                onClick={() => handleAddNewReadingOrEdit(result.meterId._id)}
              >
                <BsPlusCircle />
              </button>
            )}
            <button
              className="hover:text-violet-800"
              title="Atgriezties pie visiem skaitītājiem"
              onClick={() => handleMeterClick()}
            >
              <BsBoxArrowLeft />
            </button>
            <button
              className="hover:text-violet-800"
              title="Labot rādījumu"
              onClick={() =>
                handleAddNewReadingOrEdit(result.meterId._id, result._id)
              }
            >
              <BsPencil />
            </button>
            <button
              className="hover:text-violet-800"
              title="Dzēst rādījumu"
              onClick={() => openDeleteModal(result._id)}
            >
              <BsTrash />
            </button>
          </div>
        </div>
      )
    })
  }

  // Latest reading for every existing meter below
  if (!url) {
    return readingArr.map((meter) => {
      //console.log(meter)
      const formattedDate = formatDate(meter.readings[0].createdAt)
      return (
        <div
          key={meter._id}
          className="grid grid-cols-9 p-2 text-teal-950 text-center hover:bg-violet-100 transition-all"
        >
          <p className="">{formattedDate}</p>
          <p className="">{meter.readings[0].reading}</p>
          <p className="">
            {meter.readings[0].reading -
              (meter.readings[1]?.reading ? meter.readings[1].reading : 0)}
          </p>
          <p className="">
            {meter.readings[0].client === "" ? "-" : meter.readings[0].client}
          </p>
          <p className="">{meter.meterType}</p>
          <p className="">{meter.location}</p>
          <p className="">{meter.pavilion === "" ? "-" : meter.pavilion}</p>
          <p className="">{meter.meterNr === "" ? "-" : meter.meterNr}</p>
          <div className="flex justify-end px-4 gap-2">
            <button
              className="hover:text-violet-800"
              title="Visi skaitītāja rādījumi"
              onClick={() => handleMeterClick(meter._id)}
            >
              <BsFileEarmarkText />
            </button>
            <button
              className="hover:text-violet-800"
              title="Pievienot jaunu rādījumu"
              onClick={() => handleAddNewReadingOrEdit(meter._id)}
            >
              <BsPlusCircle />
            </button>
            <button
              className="hover:text-violet-800"
              title="Labot rādījumu"
              onClick={() =>
                handleAddNewReadingOrEdit(meter._id, meter.readings[0]._id)
              }
            >
              <BsPencil />
            </button>
            <button
              className="hover:text-violet-800"
              title="Dzēst rādījumu"
              onClick={() => openDeleteModal(meter.readings[0]._id)}
            >
              <BsTrash />
            </button>
          </div>
        </div>
      )
    })
  }
}

export default Reading
