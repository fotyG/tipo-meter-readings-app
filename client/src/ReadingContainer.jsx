import { useEffect, useState } from "react"
import Reading from "./Reading"
import Modal from "./Modal"
import DeleteConfirmationModal from "./DeleteConfirmationModal"

const ReadingContainer = () => {
  const [chosenMeter, setChosenMeter] = useState(false)
  const [url, setUrl] = useState("latest")
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [readingForMeter, setReadingForMeter] = useState(false)
  const [chosenReading, setChosenReading] = useState(false)
  const [readingDeleted, setReadingDeleted] = useState(false)

  const handleMeterClick = (meter) => {
    if (!chosenMeter) {
      setChosenMeter(meter)
      setUrl("")
    } else {
      setChosenMeter(false)
      setUrl("latest")
    }
  }

  const handleAddNewReading = (meter) => {
    setReadingForMeter(meter)
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }
  const closeDeleteModal = () => {
    setDeleteModal(false)
  }

  const openDeleteModal = (meter,id) => {
    setDeleteModal(true)
    setReadingForMeter(meter)
    setChosenReading(id)
  }

  useEffect(()=>{
    if(readingDeleted) {
      setReadingDeleted(false)
    }
  }, [readingDeleted])

  const notifyReadingDelete = () => {
    setReadingDeleted(true)
  }

  return (
    <div className="bg-violet-50 h-screen">
      <div className="grid grid-cols-9 p-2 text-teal-950 text-center border-b-gray-400 border-solid border font-bold">
        <h4 className="">Datums</h4>
        <h4 className="">Rādījums</h4>
        <h4 className="">Patēriņš</h4>
        <h4 className="">Klients</h4>
        <h4 className="">Tips</h4>
        <h4 className="">Objekts</h4>
        <h4 className="">Lokācija</h4>
        <h4 className="">Skaitītāja Nr.</h4>
        <h4 className="">Darbības</h4>
      </div>
      {deleteModal && (
        <DeleteConfirmationModal
          closeDeleteModal={closeDeleteModal}
          chosenReading={chosenReading}
          skaititajs={readingForMeter}
          notifyReadingDelete={notifyReadingDelete}
        />
      )}
      {modal && <Modal skaititajs={readingForMeter} closeModal={closeModal} />}
      {chosenMeter ? (
        <Reading
          skaititajs={chosenMeter}
          url={url}
          handleMeterClick={handleMeterClick}
          openDeleteModal={openDeleteModal}
          notifyReadingDelete={notifyReadingDelete}
        />
      ) : (
        <>
          <Reading
            skaititajs={"tipoe"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"tipog"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"tipow"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"TipoE48865026"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"TipoE32878714"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"TipoE0281935"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"TipoE0282274"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"TipoE0281679"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"TipoE0282269_33067590"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"TipoE0281803"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"TipoE0281748"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"TipoE0281934"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"TipoE042268"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"TipoE0882410"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"TipoE327544"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"TipoE0282299"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"TipoE004165"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"TipoESanitex"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"majaElectricity"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"majaGas"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"majaWater"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"majaKontroles"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"mazgatavaElectricity"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"mazgatavaWater"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
          <Reading
            skaititajs={"mazgatavaKontroles"}
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReading={handleAddNewReading}
          />
        </>
      )}
    </div>
  )
}
export default ReadingContainer
