import axios from "axios";
import { useCookies } from "react-cookie";

const DeleteConfirmationModal = ({
  closeDeleteModal,
  chosenReading,
  notifyReadingDelete,
}) => {
  const [cookies, useCookie, removeCookie] = useCookies();

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
    }
  };

  return (
    <div className="absolute bg-black bg-opacity-50 top-0 left-0 w-full min-h-screen flex items-center justify-center">
      <div className="relative bg-slate-200 bg-opacity-100 w-3/4 sm:w-1/3 rounded-lg shadow-lg p-4 my-auto">
        <button
          className="absolute top-0 right-3"
          onClick={closeDeleteModal}
        >
          x
        </button>
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
                onClick={closeDeleteModal}
              >
                Atcelt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteConfirmationModal;
