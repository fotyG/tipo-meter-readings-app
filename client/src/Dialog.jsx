import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

let url;
let axiosUrl;

const Dialog = ({
  modal,
  closeModal,
  readingForMeter,
  editMode,
  chosenReading,
}) => {
  const [readingPH, setReadingPH] = useState("Rādījums");
  const [reading, setReading] = useState("");
  const [clientPH, setClientPH] = useState("");
  const [client, setClient] = useState("");
  const [consumption, setConsumption] = useState(0);
  const [type, setType] = useState();
  const [property, setProperty] = useState("");
  const [location, setLocation] = useState("");
  const [meter, setMeter] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReadingData = async () => {
      if (editMode) {
        url = `readings/${chosenReading}`;
        axiosUrl = `/readings/${chosenReading}`;
      } else {
        url = `meters/${readingForMeter}`;
        axiosUrl = "/readings";
      }
      try {
        const response = await axios.get(`${url}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });

        setReadingPH(response.data[0].reading);
        setReading(response.data[0].reading);
        setClientPH(response.data[0].client || "-");
        setClient(response.data[0].client || "");
        setType(response.data[0].meterId.meterType);
        setProperty(response.data[0].meterId.location || "-");
        setLocation(response.data[0].meterId.pavilion || "-");
        setMeter(response.data[0].meterId.meterNr || "-");
      } catch (error) {
        if (error.response.status === 401) {
          navigate("/");
        } else {
          console.log(error);
        }
      }
    };

    if (modal) {
      fetchReadingData();
      window.modal.showModal();
    }
  }, [modal]);

  const handleReadingChange = (e) => {
    const newReading = e.target.value;
    setReading(newReading);
    setConsumption(newReading - readingPH);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        const request = await axios.patch(
          `${axiosUrl}`,
          {
            reading,
            client,
          },
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        if (request) {
          closeModal();
          window.modal.close();
        }
      } else {
        const request = await axios.post(
          `${axiosUrl}`,
          {
            meterId: readingForMeter,
            reading,
            client,
          },
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        if (request) {
          closeModal();
          window.modal.close();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Open the modal using ID.showModal() method */}

      {/* <button
        className="btn"
        onClick={() => window.modal.showModal()}
      >
        open modal
      </button> */}
      <dialog
        id="modal"
        className="modal modal-bottom sm:modal-middle bg-slate-100 rounded-lg shadow-lg"
      >
        <form
          method="dialog"
          className="modal-box"
        >
          <button
            onClick={closeModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            {/* <button className="btn">Close</button> */}
          </div>
        </form>
        <div className="flex p-3 justify-center">
          <form className="text-teal-950">
            <h3 className="block text-center m-2 font-bold">
              {editMode ? "Rādījuma labošana" : "Jaunais rādījums"}
            </h3>
            <div className="flex items-center justify-center text-left">
              <label
                className="text-sm sm:text-base w-20"
                htmlFor="radijums"
              >
                Rādījums:
              </label>
              <input
                id="radijums"
                className="text-center w-[100px] sm:w-2/3 m-2 p-1 rounded outline-slate-400"
                type="number"
                min="0"
                placeholder={readingPH}
                value={reading}
                onChange={handleReadingChange}
              />
            </div>
            <div className="flex items-center justify-center">
              <label
                htmlFor="klients"
                className="text-sm sm:text-base w-20"
              >
                Klients:
              </label>
              <input
                id="klients"
                className="text-center w-[100px] sm:w-2/3 m-2 p-1 rounded outline-slate-400"
                type="text"
                placeholder={clientPH}
                value={client}
                onChange={(e) => setClient(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <label
                htmlFor="paterins"
                className="text-sm sm:text-base w-20"
              >
                Patērīņš:
              </label>
              <input
                disabled
                readOnly
                className="text-center w-[100px] sm:w-2/3 m-2 p-1 rounded outline-slate-400"
                type="text"
                placeholder={consumption}
                value={consumption}
              />
            </div>
            <div className="flex items-center justify-center">
              <label
                htmlFor="tips"
                className="text-sm sm:text-base w-20"
              >
                Tips:
              </label>
              <input
                disabled
                readOnly
                className="text-center w-[100px] sm:w-2/3 m-2 p-1 rounded outline-slate-400"
                type="text"
                placeholder={type}
                value={type}
              />
            </div>
            <div className="flex items-center justify-center">
              <label
                htmlFor="objekts"
                className="text-sm sm:text-base w-20"
              >
                Objekts:
              </label>
              <input
                disabled
                readOnly
                className="text-center w-[100px] sm:w-2/3 m-2 p-1 rounded outline-slate-400"
                type="text"
                placeholder={property}
                value={property}
              />
            </div>
            <div className="flex items-center justify-center">
              <label
                htmlFor="lokacija"
                className="text-sm sm:text-base w-20"
              >
                Lokācija:
              </label>
              <input
                disabled
                readOnly
                className="text-center w-[100px] sm:w-2/3 m-2 p-1 rounded outline-slate-400"
                type="text"
                placeholder={location}
                value={location}
              />
            </div>
            <div className="flex items-center justify-center">
              <label
                htmlFor="skaititajaNr"
                className="text-sm sm:text-base w-20"
              >
                Skaitītāja Nr.
              </label>
              <input
                disabled
                readOnly
                className="text-center w-[100px] sm:w-2/3 m-2 p-1 rounded outline-slate-400"
                type="text"
                placeholder={meter}
                value={meter}
              />
            </div>
            <button
              className="block mx-auto border border-teal-950 px-3 py-1 rounded-md text-teal-950 hover:bg-slate-600 hover:text-white transition-all shadow-md mt-3"
              onClick={(e) => handleSubmit(e)}
            >
              {editMode ? "Labot Rādījumu" : "Iesniegt"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};
export default Dialog;
