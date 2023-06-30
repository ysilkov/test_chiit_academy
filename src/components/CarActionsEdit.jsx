import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const CarActionsEdit = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [car, setCar] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const storedCars = JSON.parse(localStorage.getItem("cars"));
    const car = storedCars.find((car) => car.id == id);
    setCar(car);
  }, [id]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const storedCars = JSON.parse(localStorage.getItem("cars"));
    const updatedCars = storedCars.map((carItem) => {
      if (carItem.id == id) {
        return {
          ...carItem,
          ...car,
        };
      }
      return carItem;
    });
    localStorage.setItem("cars", JSON.stringify(updatedCars));
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute bg-white rounded shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4">Edit Car</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label className="block mb-2 flex justify-between">
                <p className="pt-1">Company:</p>
                <input
                  type="text"
                  name="car"
                  value={car.car}
                  disabled
                  className="bg-gray-200 px-2 py-1 rounded border border-gray-400 ml-1 cursor-not-allowed"
                />
              </label>
              <label className="block mb-2 flex justify-between">
                <p className="pt-1">Model:</p>
                <input
                  type="text"
                  name="car_model"
                  value={car.car_model}
                  disabled
                  className="bg-gray-200 px-2 py-1 rounded border border-gray-400 ml-1 cursor-not-allowed"
                />
              </label>
              <label className="block mb-2 flex justify-between">
                <p className="pt-1">VIN:</p>
                <input
                  type="text"
                  name="car_vin"
                  value={car.car_vin}
                  disabled
                  className="bg-gray-200 px-2 py-1 rounded border border-gray-400 ml-1 cursor-not-allowed"
                />
              </label>
              <label className="block mb-2 flex justify-between">
                <p className="pt-1">Year:</p>
                <input
                  type="text"
                  name="car_model_year"
                  value={car.car_model_year}
                  disabled
                  className="bg-gray-200 px-2 py-1 rounded border border-gray-400 ml-1 cursor-not-allowed"
                />
              </label>
              <label className="block mb-2 flex justify-between">
                <p className="pt-1">Color:</p>
                <input
                  type="text"
                  name="car_color"
                  value={car.car_color}
                  onChange={handleInputChange}
                  className="bg-gray-100 px-2 py-1 rounded border border-gray-400 ml-1"
                />
              </label>
              <label className="block mb-2 flex justify-between">
                <p className="pt-1">Price:</p>
                <input
                  type="text"
                  name="price"
                  value={car.price}
                  onChange={handleInputChange}
                  className="bg-gray-100 px-2 py-1 rounded border border-gray-400 ml-1"
                />
              </label>
              <label className="block mb-2 flex justify-between">
                <p className="pt-1">Availability:</p>
                <input
                  type="text"
                  name="availability"
                  value={car.availability}
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

export default CarActionsEdit;
