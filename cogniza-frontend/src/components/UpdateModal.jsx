import axios from "axios";
import { useEffect } from "react";

const UpdateModal = ({
  showModal,
  setShowModal,
  fetchData,
  bookId,
  setBookId,
}) => {
  const updateBook = async () => {
    await axios.put("http://localhost:3000/book/" + bookId, {
      bookName: document.getElementById("bookName").value,
      authorName: document.getElementById("author").value,
      price: document.getElementById("price").value,
      genre: document.getElementById("genre").value,
    });

    setBookId(null);

    await fetchData();

    setShowModal(false);
  };

  const getBook = async () => {
    const res = await axios.get("http://localhost:3000/book/" + bookId);

    document.getElementById("bookName").value = res.data.bookName;
    document.getElementById("author").value = res.data.authorName;
    document.getElementById("price").value = res.data.price;
    document.getElementById("genre").value = res.data.genre;
  };

  useEffect(() => {
    console.log(bookId);
    if (bookId) {
      getBook();
    }
  }, [bookId]);

  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="dialog-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
          aria-hidden="true"
        />

        <form name="myForm" action={() => updateBook()} method="post">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="w-full py-2">
                      <div className="mb-2">
                        <label
                          htmlFor="bookName"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Book Name
                        </label>
                        <input
                          type="text"
                          id="bookName"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="author"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Author's Name
                        </label>
                        <input
                          type="text"
                          id="author"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="Doe"
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="price"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          id="price"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="0.00"
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="genre"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Genre
                        </label>
                        <select name="genre" id="genre">
                          <option value="Horror">Horror</option>
                          <option value="Comedy">Comedy</option>
                          <option value="Fantasy">Fantasy</option>
                          <option value="SciFi">Sci-Fi</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setBookId(null);
                      setShowModal(!showModal);
                    }}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
