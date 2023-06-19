import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  BsBoxArrowLeft,
  BsFileEarmarkText,
  BsPlusCircle,
  BsTrash,
  BsPencil,
} from "react-icons/bs";
import { useNavigate } from "react-router";
import { UserContext } from "./UserContext";

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
  } = useContext(UserContext);
  const [readingArr, setReadingArr] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  const formatDate = (dateData) => {
    const isoDateString = dateData;
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const formattedDate = `${day}.${month}.${year}.`;
    return formattedDate;
  };

  useEffect(() => {
    const getReading = async () => {
      try {
        const response = await axios.get(`/meters/${url}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        if (url) {
          const array = response.data;
          // loop through the array and calculate the consumption for each reading
          const readingsWithConsumption = array.map((reading, index) => {
            const consumption =
              index < array.length - 1
                ? reading.reading - array[index + 1].reading
                : 0;
            return { ...reading, consumption };
          });
          setReadingArr(readingsWithConsumption);
        } else {
          setReadingArr(response.data);
        }
      } catch (error) {
        if (error.response.status === 401) {
          setLoggedInUsername(null);
          setId(null);
          setIsLoggedIn(false);
          navigate("/");
        } else {
          console.log(error);
        }
      }
    };
    getReading();
  }, [handleAddNewReadingOrEdit, notifyReadingDelete]);

  // All readings for chosen meter
  if (url) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:block">
        <div className="sm:col-span-2 text-center text-xl my-2 font-bold flex justify-center items-center gap-2 lg:hidden">
          <h1>Ir izvēlēts skaitītājs</h1>
          <button
            onClick={handleMeterClick}
            className="text-sm font-normal border bg-slate-100 border-black px-2 py-1 rounded-md text-black hover:bg-slate-600 hover:text-white transition-all"
          >
            Atgriezties
          </button>
        </div>
        {readingArr.map((result, idx) => {
          const odd = (idx + 2) % 2 === 0;
          const formattedDate = formatDate(result.createdAt);
          return (
            <div key={result._id}>
              {/* Mobile view */}
              <div className="w-64 sm:w-72 flex justify-between p-2 my-3 mx-auto border shadow-sm rounded-md bg-slate-50 lg:hidden">
                <div className="p-3">
                  <p>Datums: {formattedDate}</p>
                  <p>Rādījums: {result.reading}</p>
                  <p>Patēriņš: {result.consumption}</p>
                  <p>Klients: {result.client === "" ? "-" : result.client}</p>
                  <p>
                    Tips: {result.meterId.meterType}{" "}
                    {result.meterId.meterType === "Elektrība"
                      ? "⚡"
                      : result.meterId.meterType === "Ūdens"
                      ? "💧"
                      : result.meterId.meterType === "Gāze"
                      ? "🍀"
                      : result.meterId.meterType === "Kontroles"
                      ? "⏰"
                      : ""}
                  </p>
                  <p>Objekts: {result.meterId.location}</p>
                  <p>
                    Lokācija:{" "}
                    {result.meterId.pavilion === ""
                      ? "-"
                      : result.meterId.pavilion}
                  </p>
                  <p>
                    Skaitītājs Nr.{" "}
                    {result.meterId.meterNr === ""
                      ? "-"
                      : result.meterId.meterNr}
                  </p>
                </div>

                <div className="flex flex-col justify-around">
                  {readingArr[0]._id === result._id && (
                    <button
                      className="hover:scale-125 border border-slate-500 p-3 bg-slate-200 rounded-md"
                      title="Pievienot jaunu rādījumu"
                      onClick={() =>
                        handleAddNewReadingOrEdit(result.meterId._id)
                      }
                    >
                      <BsPlusCircle />
                    </button>
                  )}
                  <button
                    className="hover:scale-125 border border-slate-500 p-3 bg-slate-200 rounded-md"
                    title="Atgriezties pie visiem skaitītājiem"
                    onClick={() => handleMeterClick()}
                  >
                    <BsBoxArrowLeft />
                  </button>
                  <button
                    className="hover:scale-125 border border-slate-500 p-3 bg-slate-200 rounded-md"
                    title="Labot rādījumu"
                    onClick={() =>
                      handleAddNewReadingOrEdit(result.meterId._id, result._id)
                    }
                  >
                    <BsPencil />
                  </button>
                  <button
                    className="hover:scale-125 border border-slate-500 p-3 bg-slate-200 rounded-md"
                    title="Dzēst rādījumu"
                    onClick={() => openDeleteModal(result._id)}
                  >
                    <BsTrash />
                  </button>
                </div>
              </div>
              {/* Big Screens under */}
              <div
                className={
                  "hidden lg:grid grid-cols-9 p-2 text-teal-950 text-center hover:bg-slate-300 transition-all border-b " +
                  (odd ? "bg-slate-200" : "")
                }
              >
                <p className="">{formattedDate}</p>
                <p className="">{result.reading}</p>
                <p className="">{result.consumption}</p>
                <p className="">{result.client === "" ? "-" : result.client}</p>
                <p className="">{result.meterId.meterType}</p>
                <p className="">{result.meterId.location}</p>
                <p className="">
                  {result.meterId.pavilion === ""
                    ? "-"
                    : result.meterId.pavilion}
                </p>
                <p className="">
                  {result.meterId.meterNr === "" ? "-" : result.meterId.meterNr}
                </p>
                <div className="flex justify-end px-4 gap-2">
                  {readingArr[0]._id === result._id && (
                    <button
                      className="hover:scale-125"
                      title="Pievienot jaunu rādījumu"
                      onClick={() =>
                        handleAddNewReadingOrEdit(result.meterId._id)
                      }
                    >
                      <BsPlusCircle />
                    </button>
                  )}
                  <button
                    className="hover:scale-125"
                    title="Atgriezties pie visiem skaitītājiem"
                    onClick={() => handleMeterClick()}
                  >
                    <BsBoxArrowLeft />
                  </button>
                  <button
                    className="hover:scale-125"
                    title="Labot rādījumu"
                    onClick={() =>
                      handleAddNewReadingOrEdit(result.meterId._id, result._id)
                    }
                  >
                    <BsPencil />
                  </button>
                  <button
                    className="hover:scale-125"
                    title="Dzēst rādījumu"
                    onClick={() => openDeleteModal(result._id)}
                  >
                    <BsTrash />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Latest reading for every existing meter below
  if (!url) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:block">
        <h1 className="sm:col-span-2 text-center text-xl my-2 font-bold lg:hidden">
          Visi skaitītāji
        </h1>
        {readingArr.map((meter, idx) => {
          const odd = (idx + 2) % 2 === 0;
          const formattedDate = formatDate(meter.readings[0].createdAt);
          return (
            <div key={meter._id}>
              {/* Mobile view */}
              <div className="w-64 sm:w-72 flex justify-between p-2 my-3 mx-auto border shadow-sm rounded-md bg-slate-50 lg:hidden">
                <div className="p-3">
                  <p>Datums: {formattedDate}</p>
                  <p>Rādījums: {meter.readings[0].reading}</p>
                  <p>
                    Patēriņš:{" "}
                    {meter.readings[0].reading -
                      (meter.readings[1]?.reading
                        ? meter.readings[1].reading
                        : 0)}
                  </p>
                  <p>
                    Klients:{" "}
                    {meter.readings[0].client === ""
                      ? "-"
                      : meter.readings[0].client}
                  </p>
                  <p>
                    Tips: {meter.meterType}{" "}
                    {meter.meterType === "Elektrība"
                      ? "⚡"
                      : meter.meterType === "Ūdens"
                      ? "💧"
                      : meter.meterType === "Gāze"
                      ? "🍀"
                      : meter.meterType === "Kontroles"
                      ? "⏰"
                      : ""}
                  </p>
                  <p>Objekts: {meter.location}</p>
                  <p>
                    Lokācija: {meter.pavilion === "" ? "-" : meter.pavilion}
                  </p>
                  <p>
                    Skaitītājs Nr. {meter.meterNr === "" ? "-" : meter.meterNr}
                  </p>
                </div>

                <div className="flex flex-col justify-around">
                  <button
                    className="hover:scale-125 border border-slate-500 p-3 bg-slate-200 rounded-md"
                    title="Visi skaitītāja rādījumi"
                    onClick={() => handleMeterClick(meter._id)}
                  >
                    <BsFileEarmarkText size={20} />
                  </button>
                  <button
                    className="hover:scale-125 border border-slate-500 p-3 bg-slate-200 rounded-md"
                    title="Pievienot jaunu rādījumu"
                    onClick={() => handleAddNewReadingOrEdit(meter._id)}
                  >
                    <BsPlusCircle />
                  </button>
                  <button
                    className="hover:scale-125 border border-slate-500 p-3 bg-slate-200 rounded-md"
                    title="Labot rādījumu"
                    onClick={() =>
                      handleAddNewReadingOrEdit(
                        meter._id,
                        meter.readings[0]._id
                      )
                    }
                  >
                    <BsPencil />
                  </button>
                  <button
                    className="hover:scale-125 border border-slate-500 p-3 bg-slate-200 rounded-md"
                    title="Dzēst rādījumu"
                    onClick={() => openDeleteModal(meter.readings[0]._id)}
                  >
                    <BsTrash />
                  </button>
                </div>
              </div>

              {/* Big screens under */}
              <div
                className={
                  "hidden lg:grid grid-cols-9 p-2 text-teal-950 text-center hover:bg-slate-300 transition-all border-b " +
                  (odd ? "bg-slate-200" : "")
                }
              >
                <p className="">{formattedDate}</p>
                <p className="">{meter.readings[0].reading}</p>
                <p className="">
                  {meter.readings[0].reading -
                    (meter.readings[1]?.reading
                      ? meter.readings[1].reading
                      : 0)}
                </p>
                <p className="">
                  {meter.readings[0].client === ""
                    ? "-"
                    : meter.readings[0].client}
                </p>
                <p className="">{meter.meterType}</p>
                <p className="">{meter.location}</p>
                <p className="">
                  {meter.pavilion === "" ? "-" : meter.pavilion}
                </p>
                <p className="">{meter.meterNr === "" ? "-" : meter.meterNr}</p>
                <div className="flex justify-end px-4 gap-2">
                  <button
                    className="hover:scale-125"
                    title="Visi skaitītāja rādījumi"
                    onClick={() => handleMeterClick(meter._id)}
                  >
                    <BsFileEarmarkText />
                  </button>
                  <button
                    className="hover:scale-125"
                    title="Pievienot jaunu rādījumu"
                    onClick={() => handleAddNewReadingOrEdit(meter._id)}
                  >
                    <BsPlusCircle />
                  </button>
                  <button
                    className="hover:scale-125"
                    title="Labot rādījumu"
                    onClick={() =>
                      handleAddNewReadingOrEdit(
                        meter._id,
                        meter.readings[0]._id
                      )
                    }
                  >
                    <BsPencil />
                  </button>
                  <button
                    className="hover:scale-125"
                    title="Dzēst rādījumu"
                    onClick={() => openDeleteModal(meter.readings[0]._id)}
                  >
                    <BsTrash />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Reading;
