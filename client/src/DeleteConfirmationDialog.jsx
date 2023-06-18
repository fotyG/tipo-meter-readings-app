import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const DeleteConfirmationDialog = ({
  deleteModal,
  closeDeleteModal,
  chosenReading,
  notifyReadingDelete,
}) => {
  const [cookies, useCookie, removeCookie] = useCookies();

  useEffect(() => {
    if (deleteModal) {
      window.deletemodal.showModal();
    }
  }, [deleteModal]);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    const deletedItem = await axios.delete(`readings/${id}`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });
    if (deletedItem) {
      notifyReadingDelete();
      closeDeleteModal();
      window.deletemodal.close();
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
        id="deletemodal"
        className="modal modal-bottom sm:modal-middle bg-slate-100 rounded-lg shadow-lg"
      >
        <form
          method="dialog"
          className="modal-box"
        >
          <button
            onClick={closeDeleteModal}
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
          <div className="text-teal-950">
            <h3 className="block text-center m-2 font-bold">
              Tiešām vēlaties dzēst rādījumu?
            </h3>
            <div className="flex justify-center gap-3">
              <button
                className="block border border-teal-950 px-3 py-1 rounded-md text-teal-950 hover:bg-rose-300 transition-all shadow-md mt-3"
                onClick={(e) => handleDelete(e, chosenReading)}
              >
                Dzēst
              </button>
              <button
                className="block bg-gray-500 border border-teal-950 px-3 py-1 rounded-md text-white hover:bg-gray-700 transition-all shadow-md mt-3"
                onClick={() => {
                  closeDeleteModal();
                  window.deletemodal.close();
                }}
              >
                Atcelt
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
export default DeleteConfirmationDialog;
