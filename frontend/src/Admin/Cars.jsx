import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChevronRight, FaCar, FaUser, FaGasPump, FaMapMarkerAlt, FaPlus, FaCheckCircle, FaTags, FaChartLine  
} from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

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

const StatCard = ({ icon: Icon, title, value, color, trend }) => (
  <motion.div 
    className={`bg-white overflow-hidden shadow-md rounded-xl ${color}`}
    whileHover={{ y: -5, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="px-4 py-5 sm:p-6 flex items-center justify-between">
      <div>
        <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
        <dd className="mt-1 text-3xl font-semibold text-gray-900">{value}</dd>
      </div>
      <div className={`rounded-full p-3 ${color.replace('border-l-4', 'bg-opacity-20')}`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
    </div>
    {trend && (
      <div className={`px-4 py-2 ${trend > 0 ? 'bg-green-50' : 'bg-red-50'}`}>
        <span className={`text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
        </span>
      </div>
    )}
  </motion.div>
);

function Cars() {
  const [cars, setCars] = useState([]);
  const [visibleCars, setVisibleCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, carId: null });

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      try {
        const fetchedCars = await fetchCarsData();
        setCars(fetchedCars);
        setVisibleCars(fetchedCars.slice(0, 5));
      } catch (error) {
        console.error('Error loading cars:', error);
        toast.error('Failed to load cars data!');
        setCars([]);
        setVisibleCars([]);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  const handleViewMore = () => {
    setVisibleCars(cars);
    setShowMore(true);
  };

  const handleDeleteClick = (carId) => {
    setDeleteConfirmation({ isOpen: true, carId });
  };

  const handleDeleteConfirm = async () => {
    const { carId } = deleteConfirmation;
    if (!carId) {
      console.error('No car ID provided for deletion');
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3000/api/cars/delete/${carId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Remove the deleted car from the state
      setCars(cars.filter(car => car._id !== carId));
      setVisibleCars(visibleCars.filter(car => car._id !== carId));
      toast.success('Car deleted successfully!');
    } catch (err) {
      console.error('Error handling delete:', err.message);
      toast.error(`Failed to delete car: ${err.message}`);
    } finally {
      setDeleteConfirmation({ isOpen: false, carId: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation({ isOpen: false, carId: null });
  };

  const filteredCars = visibleCars.filter((car) =>
    `${car.brand} ${car.carName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-10 px-4 mb-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Cars Management</h1>
        <Link to='/admin/upload'
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-2 px-4 rounded-full inline-flex items-center shadow-lg"
        >
          <FaPlus className="h-5 w-5 mr-2" />
          Add New Car
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Link to='/admin/total-car'>
          <StatCard icon={FaCar} title="Total Cars" value={cars.length} color="border-l-4 border-blue-500" trend={5} />
        </Link>
        <StatCard icon={FaCheckCircle} title="Available Cars" value={cars.filter(car => car.status === "Available").length} color="border-l-4 border-green-500" trend={2} />
        <StatCard icon={FaTags} title="Sold Cars" value={cars.filter(car => car.status === "Sold").length} color="border-l-4 border-red-500" trend={-3} />
        <StatCard icon={FaChartLine} title="Average Price" value={`₹${Math.round(cars.reduce((acc, car) => acc + car.price, 0) / cars.length || 0).toLocaleString()}`} color="border-l-4 border-yellow-500" trend={1} />
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Cars Inventory</h2>
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search cars..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <svg
                    className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : filteredCars.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No cars found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {filteredCars.map((car) => (
                      <motion.div
                        key={car._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={car?.images?.[0]?.url || "/placeholder.svg"}
                            alt={`${car.brand} ${car.carName}`}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h3 className="font-semibold text-lg">
                              {car.year} {car.brand} {car.carName}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              ₹{car.price ? (car.price / 1000).toFixed(2) : "N/A"}L • {car.fuelType} • {car.kilometer} km
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <a
                            href={`/admin/carsdata/${car._id}`}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          >
                            View
                          </a>
                          <button
                            onClick={() => handleDeleteClick(car._id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
              )}
            </div>
            <div className="flex items-center justify-center  bg-gray-100">
  <Link to='/admin/total-car' 
    className="px-6 py-3 bg-gradient-to-r bg-orange-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
  >
     View More
  </Link>
</div>
          </div>
        </div>

        {deleteConfirmation.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-bold">Confirm Deletion</h2>
              <p className="mt-2 text-sm text-gray-600">
                Are you sure you want to delete this car? This action cannot be undone.
              </p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={handleDeleteCancel}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cars;