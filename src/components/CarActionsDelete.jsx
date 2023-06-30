import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const CarActionsDelete = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDelete = () => {
   const storedCars = JSON.parse(localStorage.getItem("cars"));
   const updatedCars = storedCars.filter((carItem) => carItem.id != id);
   localStorage.setItem("cars", JSON.stringify(updatedCars));
   setIsModalOpen(false);
   navigate("/");
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute bg-white rounded shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4">Delete Car</h2>
            <p>Are you sure you want to delete this car?</p>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
              <Link
                to={"/"}
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-1 rounded ml-2"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarActionsDelete;
