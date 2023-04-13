import { useEffect, useState } from "react"
import Reading from "./Reading"
import Modal from "./Modal"
import DeleteConfirmationModal from "./DeleteConfirmationModal"

const ReadingContainer = () => {
  const [chosenMeter, setChosenMeter] = useState(false)
  const [url, setUrl] = useState("")
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [readingForMeter, setReadingForMeter] = useState(false)
  const [chosenReading, setChosenReading] = useState(false)
  const [readingDeleted, setReadingDeleted] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const handleMeterClick = (meter) => {
    //console.log(meter)
    if (!chosenMeter) {
      setChosenMeter(meter)
      setUrl(meter)
    } else {
      setChosenMeter(false)
      setUrl("")
    }
  }

  const handleAddNewReadingOrEdit = (meter, id) => {
    setReadingForMeter(meter)
    if(id) {
      setChosenReading(id)
      setEditMode(true)
    }
    if(!id) {
      setEditMode(false)
    }
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  const closeDeleteModal = () => {
    setDeleteModal(false)
  }

  const openDeleteModal = (id) => {
    setDeleteModal(true)
    setChosenReading(id)
  }
  
  const notifyReadingDelete = () => {
    setReadingDeleted(true)
  }
  
  useEffect(()=>{
    if(readingDeleted) {
      setReadingDeleted(false)
    }
  }, [readingDeleted])
  

  return (
    <div className="">
      <div className="grid grid-cols-9 p-2 text-teal-950 text-center border-b-gray-400 border-solid border font-bold">
        <h4>Datums</h4>
        <h4>Rādījums</h4>
        <h4>Patēriņš</h4>
        <h4>Klients</h4>
        <h4>Tips</h4>
        <h4>Objekts</h4>
        <h4>Lokācija</h4>
        <h4>Skaitītāja Nr.</h4>
        <h4>Darbības</h4>
      </div>
      {deleteModal && (
        <DeleteConfirmationModal
          closeDeleteModal={closeDeleteModal}
          chosenReading={chosenReading}
          readingForMeter={readingForMeter}
          notifyReadingDelete={notifyReadingDelete}
        />
      )}
      {modal && (
        <Modal
          editMode={editMode}
          chosenReading={chosenReading}
          readingForMeter={readingForMeter}
          closeModal={closeModal}
        />
      )}
      {chosenMeter ? (
        <Reading
          url={url}
          handleMeterClick={handleMeterClick}
          openDeleteModal={openDeleteModal}
          notifyReadingDelete={notifyReadingDelete}
          handleAddNewReadingOrEdit={handleAddNewReadingOrEdit}
        />
      ) : (
        <>
          <Reading
            url={url}
            handleMeterClick={handleMeterClick}
            handleAddNewReadingOrEdit={handleAddNewReadingOrEdit}
            openDeleteModal={openDeleteModal}
          />
        </>
      )}
    </div>
  )
}
export default ReadingContainer
