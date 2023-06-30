import React, { useState, useEffect } from "react";
import { fetchData } from "../services/api.js";
import { usePagination } from "../hook/usePagination.js";
import { Link } from "react-router-dom";

const CarTable = () => {
  const [error, setError] = useState(null);
  const {
    currentPage,
    displayedPages,
    filteredCars,
    carsPerPage,
    search,
    setCars,
    setSearch,
    paginate,
    goToPreviousPage,
    goToNextPage,
    setCurrentPage,
  } = usePagination(20, 1);

  useEffect(() => {
    const storedCars = localStorage.getItem("cars");
    if (storedCars) {
      setCars(JSON.parse(storedCars));
    } else {
      const fetchDataFromApi = async () => {
        try {
          const data = await fetchData();
          setCars(data);
          localStorage.setItem("cars", JSON.stringify(data));
        } catch (error) {
          setError("An error occurred while fetching data.");
          console.error(error);
        }
      };
      fetchDataFromApi();
    }
  }, [setCars]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl my-4">Cars list</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          className="border border-gray-300 px-10 py-2 rounded"
          style={{ paddingLeft: "1rem" }}
        />
      </div>
      <div className="my-4">
        <Link to={"/add"} className="p-2 bg-blue-500 text-white rounded">
          Add car
        </Link>
      </div>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 font-bold">Company</th>
            <th className="px-4 py-2 font-bold">Model</th>
            <th className="px-4 py-2 font-bold">VIN</th>
            <th className="px-4 py-2 font-bold">Color</th>
            <th className="px-4 py-2 font-bold">Year</th>
            <th className="px-4 py-2 font-bold">Price</th>
            <th className="px-4 py-2 font-bold">Availability</th>
            <th className="px-4 py-2 font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCars.map((car) => (
            <tr key={car.id}>
              <td className="border px-4 py-2">{car.car}</td>
              <td className="border px-4 py-2">{car.car_model}</td>
              <td className="border px-4 py-2">{car.car_vin}</td>
              <td className="border px-4 py-2">{car.car_color}</td>
              <td className="border px-4 py-2">{car.car_model_year}</td>
              <td className="border px-4 py-2">{car.price}</td>
              <td className="border px-4 py-2">
                {car.availability.toString()}
              </td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-4 py-1 rounded">
                  <Link to={`/edit/${car.id}`}>Edit</Link>
                </button>
                <button className="bg-blue-500 text-white px-2 py-1 rounded ml-4">
                  <Link to={`/delete/${car.id}`}>Delete</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {filteredCars.length > carsPerPage && (
          <ul className="flex items-center">
            <li
              className={`mx-1 px-3 py-1 cursor-pointer ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={goToPreviousPage}
            >
              &lt;
            </li>
            {displayedPages.map((pageNumber) => (
              <li
                key={pageNumber}
                className={`mx-1 px-3 py-1 cursor-pointer ${
                  pageNumber === currentPage ? "bg-gray-500 text-white" : ""
                }`}
                onClick={() => paginate(pageNumber)}
              >
                {pageNumber}
              </li>
            ))}
            <li
              className={`mx-1 px-3 py-1 cursor-pointer ${
                currentPage === Math.ceil(filteredCars.length / carsPerPage)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={goToNextPage}
            >
              &gt;
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default CarTable;
