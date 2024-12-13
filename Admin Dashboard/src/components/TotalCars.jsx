import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaChevronRight,
  FaCar,
  FaUser,
  FaGasPump,
  FaSearch,
  FaBars,
} from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fetchCarsData = async () => {
  try {
    const response = await fetch(
      'http://localhost:3000/api/cars/cars',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
};

function TotalCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      try {
        const fetchedCars = await fetchCarsData();
        setCars(fetchedCars);
        setFilteredCars(fetchedCars); // Initialize filtered cars with all cars
      } catch (error) {
        console.error('Error loading cars:', error);
        toast.error('Failed to load cars data!');
        setCars([]);
        setFilteredCars([]);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  // Filter cars based on the search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCars(cars); // Reset to all cars if query is empty
    } else {
      setFilteredCars(
        cars.filter((car) =>
          `${car.brand} ${car.carName} ${car.year} ${car.fuelType}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, cars]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast notifications */}
      <ToastContainer position="bottom-right" autoClose={3000} />

      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Branding */}
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-orange-500">CarNagpur</div>
          </div>

          {/* Search Bar */}
          <div className="relative flex items-center w-full max-w-lg">
            <input
              type="text"
              placeholder="Search cars by brand, name, year, or fuel type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-transform duration-300"
            />
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="absolute right-4 p-2 bg-orange-500 rounded-full cursor-pointer"
            >
              <FaSearch className="text-white" />
            </motion.div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <FaBars className="text-2xl text-gray-600" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {menuOpen && (
          <div className="md:hidden bg-gray-100 px-4 py-3">
            <input
              type="text"
              placeholder="Search cars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        )}
      </nav>

      {/* Content section */}
      <div className="container mx-auto mt-10 px-4 mb-20">
        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
            </div>
          ) : filteredCars.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No cars found.</p>
            </div>
          ) : (
            <motion.div
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCars.map((car) => (
                <motion.div
                  key={car._id}
                  className="bg-white rounded-xl overflow-hidden w-[300px] transition-all duration-300 hover:shadow-xl border border-gray-200 shadow-md shadow-orange-400"
                  whileHover={{ y: -5 }}
                >
                  {/* Image Section */}
                  <div className="relative h-48">
                    <img
                      src={car?.images?.[0]?.url || "/placeholder.svg"}
                      alt={`${car.brand || "Brand"} ${car.carName || "Car Name"}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Car Details */}
                  <div className="p-6 space-y-4">
                    {/* Title */}
                    <h3 className="font-bold text-xl text-blue-800">
                      {car.year || "Year"} {car.brand || "Brand"} {car.carName || "Car Name"}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <FaCar className="h-3 w-3 mr-1" />
                        {car.kilometer} km
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <FaGasPump className="h-3 w-3 mr-1" />
                        {car.fuelType}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <FaUser className="h-3 w-3 mr-1" />
                        {car.owner}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-orange-500">
                        ₹{car.price ? (car.price / 100000).toFixed(2) : "N/A"}L
                      </div>
                    </div>

                    {/* View Details */}
                    <motion.a
                      href={`/carsdata/${car._id}`}
                      className="block w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-center font-medium group"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      View Details
                      <FaChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TotalCars;
