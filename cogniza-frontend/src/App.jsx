import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./components/Modal";
import UpdateModal from "./components/UpdateModal";

const App = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const [productData, setProductData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [bookId, setBookId] = useState(null);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:3000/getBooks");

    setProductData(res.data);
  };

  return (
    <div>
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://www.reshot.com/preview-assets/icons/XDCHJTKVNP/unicorn-XDCHJTKVNP.svg"
              className="h-8"
              alt=""
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Cognizant Frontend Technical
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            />
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="w-full p-5 flex flex-row-reverse">
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Add a book
        </button>
      </div>
      {showForm && (
        <Modal
          showModal={showForm}
          setShowModal={setShowForm}
          fetchData={fetchData}
        />
      )}
      {showUpdateForm && (
        <UpdateModal
          showModal={showUpdateForm}
          setShowModal={setShowUpdateForm}
          fetchData={fetchData}
          bookId={bookId}
          setBookId={setBookId}
        />
      )}
      <div className="w-full flex justify-center p-5">
        <div className="grid grid-cols-3">
          {productData &&
            productData.map((product, i) => {
              return (
                <div key={product.bookName + i} className="m-3">
                  <div className="w-full flex flex-row-reverse">
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        setBookId(product._id);
                        setShowUpdateForm(true);
                      }}
                    >
                      Edit
                    </span>
                  </div>
                  <a
                    href="#"
                    className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100"
                  >
                    <img
                      className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                      src={
                        "https://raketcontent.com/BOOK_COVER_TEMPLATE_1_6de77fa7f8.png"
                      }
                      alt=""
                    />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        {product.bookName} by {product.authorName}
                      </h5>
                      <h4 className="mb-2 text-l font-bold tracking-tight text-gray-900">
                        {product.genre}
                      </h4>
                      <p className="mb-3 font-normal text-gray-700">{`Now for only ${product.price} pesos`}</p>
                    </div>
                  </a>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default App;
