import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const AddCarModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [car, setCar] = useState({ id: uuidv4() });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value.toString(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedCars = JSON.parse(localStorage.getItem("cars")) || [];
    const updatedCars = [...storedCars, car];
    console.log(updatedCars);
    localStorage.setItem("cars", JSON.stringify(updatedCars));
    setIsModalOpen(false);
    navigate("/");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute bg-white rounded shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4">Add Car</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label className="block mb-2 flex justify-between">
                <p className="pt-1">Company:</p>
                <input
                  type="text"
                  name="car"
                  onChange={handleInputChange}
                  className="bg-gray-200 px-2 py-1 rounded border border-gray-400 ml-1"
                />
              </label>
              <label className="block mb-2 flex justify-between">
                <p className="pt-1">Model:</p>
                <input
                  type="text"
                  name="car_model"
                  onChange={handleInputChange}
                  className="bg-gray-200 px-2 py-1 rounded border border-gray-400 ml-1"
                />
              </label>
              <label className="block mb-2 flex justify-between">
                <p className="pt-1">VIN:</p>
                <input
                  type="text"
                  name="car_vin"
                  onChange={handleInputChange}
                  className="bg-gray-200 px-2 py-1 rounded border border-gray-400 ml-1"
                />
              </label>
              <label className="block mb-2 flex justify-between">
                <p className="pt-1">Year:</p>
                <input
                  type="text"
                  name="car_model_year"
                  onChange={handleInputChange}
                  className="bg-gray-200 px-2 py-1 rounded border border-gray-400 ml-1"
                />
              </label>
              <label className="block mb-2 flex justify-between">
                <p className="pt-1">Color:</p>
                <input
                  type="text"
                  name="car_color"
                  onChange={handleInputChange}
                  className="bg-gray-100 px-2 py-1 rounded border border-gray-400 ml-1"
                />
              </label>
              <label className="block mb-2 flex justify-between">
                <p className="pt-1">Price:</p>
                <input
                  type="text"
                  name="price"
                  defaultValue="$"
                  onChange={handleInputChange}
                  className="bg-gray-100 px-2 py-1 rounded border border-gray-400 ml-1"
                />
              </label>
              <label className="block mb-2 flex justify-between">
                <p className="pt-1">Availability:</p>
                <input
                  type="text"
                  name="availability"
                  onChange={handleInputChange}
                  className="bg-gray-100 px-2 py-1 rounded border border-gray-400 ml-1"
                />
              </label>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                >
                  Save
                </button>
                <Link
                  to={"/"}
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-gray-700 px-4 py-1 rounded ml-2"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCarModal;
