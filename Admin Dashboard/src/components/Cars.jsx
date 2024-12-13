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

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      try {
        const fetchedCars = await fetchCarsData();
        setCars(fetchedCars);
        setVisibleCars(fetchedCars.slice(0, 6));
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

  return (
    <div className="container mx-auto mt-10 px-4 mb-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Cars Management</h1>
        <Link to='/upload'
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-2 px-4 rounded-full inline-flex items-center shadow-lg"
        >
          <FaPlus className="h-5 w-5 mr-2" />
          Add New Car
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Link to='/total-car'>
          <StatCard icon={FaCar} title="Total Cars" value={cars.length} color="border-l-4 border-blue-500" trend={5} />
        </Link>
        <StatCard icon={FaCheckCircle} title="Available Cars" value={cars.filter(car => car.status === "Available").length} color="border-l-4 border-green-500" trend={2} />
        <StatCard icon={FaTags} title="Sold Cars" value={cars.filter(car => car.status === "Sold").length} color="border-l-4 border-red-500" trend={-3} />
        <StatCard icon={FaChartLine} title="Average Price" value={`₹${Math.round(cars.reduce((acc, car) => acc + car.price, 0) / cars.length).toLocaleString()}`} color="border-l-4 border-yellow-500" trend={1} />
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
          </div>
        ) : visibleCars.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No cars found.</p>
          </div>
        ) : (
          <>
            <motion.div
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {visibleCars.map((car) => (
                  <motion.div
                    key={car._id}
                    className="bg-white rounded-xl overflow-hidden w-[300px] transition-all duration-300 hover:shadow-xl border border-gray-200 shadow-md shadow-orange-400"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative h-48">
                      <img
                        src={car?.images?.[0]?.url || "/placeholder.svg"}
                        alt={`${car.brand || "Brand"} ${car.carName || "Car Name"}`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="font-bold text-xl text-blue-800">
                        {car.year || "Year"} {car.brand || "Brand"} {car.carName || "Car Name"}
                      </h3>

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

                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-orange-500">
                          ₹{car.price ? (car.price / 100000).toFixed(2) : "N/A"}L
                        </div>
                      </div>

                      <div className="space-y-3">
                        {/* <div className="flex items-center text-sm text-gray-600">
                          <FaMapMarkerAlt className="h-4 w-4 text-gray-400 mr-1" />
                          Free Test Drive Available
                        </div> */}
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
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            {!showMore && cars.length > 6 && (
              <div className="mt-8 text-center">
                <Link to='/total-car'
                  onClick={handleViewMore}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full inline-flex items-center shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View More
                  <FaChevronRight className="ml-2" />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Cars;

