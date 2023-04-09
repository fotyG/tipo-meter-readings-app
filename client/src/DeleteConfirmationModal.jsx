import axios from "axios"
import { useEffect, useState } from "react"

const DeleteConfirmationModal = ({
  closeDeleteModal,
  chosenReading,
  skaititajs,
  notifyReadingDelete,
}) => {
  const handleDelete = async (e, meter, id) => {
    e.preventDefault()
    const deletedItem = await axios.delete(`readings/${meter}/${id}`)
    if (deletedItem) {
      notifyReadingDelete()
      closeDeleteModal()
    }
  }

  return (
    <div className="absolute bg-black bg-opacity-50 top-0 left-0 w-screen h-screen flex items-center justify-center">
      <div className="relative bg-violet-50 bg-opacity-100 w-1/3 rounded-lg shadow-lg p-4 mb-20">
        <button className="absolute top-0 right-3" onClick={closeDeleteModal}>
          x
        </button>
        <div className="flex p-3 justify-center">
          <div className="text-teal-950">
            <h3 className="block text-center m-2 font-bold">
              Tiešām vēlaties dzēst rādījumu?
            </h3>
            <div className="flex justify-center gap-3">
              <button
                className="block border border-teal-950 px-3 py-1 rounded-md text-teal-950 hover:bg-purple-300 transition-all shadow-md mt-3"
                onClick={(e) => handleDelete(e, skaititajs, chosenReading)}
              >
                Dzēst
              </button>
              <button
                className="block bg-gray-500 border border-teal-950 px-3 py-1 rounded-md text-white hover:bg-gray-700 transition-all shadow-md mt-3"
                onClick={closeDeleteModal}
              >
                Atcelt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DeleteConfirmationModal
