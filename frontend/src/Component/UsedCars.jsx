import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronRight, FaCar, FaUser, FaGasPump, FaMapMarkerAlt, FaShoppingCart, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Eye, EyeOff } from 'react-icons/fi';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const brandsWithCarNames = [
  {
    name: "maruti suzuki",
    carNames: ["Baleno", "Wagon R", "Ertiga", "Dzire", "Ciaz", "Celerio", "Ignis", "Swift", "Vitara Brezza", "Alto", "Ritz", "Zen", "Omni"]
  },
  {
    name: "hyundai",
    carNames: ["Elite i20", "Grand i10", "Creta", "Verna", "Xcent", "Santro", "Sonata", "Accent", "Elantra"]
  },
  {
    name: "Tata",
    carNames: ["nexon", "Tiago", "Punch", "Tigor", "Altroz", "Safari", "Harrier","curvy", "Venture", "Indigo", "Indica", "Bolt", "Hexa", "Nano"]
  },
  {
    name: "Honda",
    carNames: ["City", "Amaze", "Jazz", "Brio", "Civic", "Accord"]
  },
  {
    name: "Renault",
    carNames: ["Kwid", "Tribber", "Kiger", "Duster"]
  },
  {
    name: "Volkswagen",
    carNames: ["Polo", "Vento", "Ameo", "Jetta", "Taigun"]
  },
  {
    name: "Mahindra",
    carNames: ["XUV", "TUV", "Bolero", "Scorpio", "Quanto", "Thar"]
  },
  {
    name: "KIA",
    carNames: ["Seltos", "Sonet", "Carnival"]
  },
  {
    name: "Audi",
    carNames: ["A3", "A4", "A6", "Q3", "Q5"]
  },
  {
    name: "Ford",
    carNames: ["EcoSport", "Figo", "Aspire", "Endeavour"]
  },
  // {
  //   name: "MG",
  //   carNames: ["Hector", "Astor", "Gloster"]
  // },
  // {
  //   name: "Datsun",
  //   carNames: ["GO", "GO+", "redi-GO"]
  // },
  // {
  //   name: "Skoda",
  //   carNames: ["Rapid", "Octavia", "Superb", "Kushaq"]
  // },
  // {
  //   name: "Toyota",
  //   carNames: ["Innova", "Fortuner", "Glanza", "Urban Cruiser"]
  // },
  // {
  //   name: "Jeep",
  //   carNames: ["Compass", "Wrangler", "Grand Cherokee"]
  // },
  // {
  //   name: "Nissan",
  //   carNames: ["Magnite", "Kicks", "GT-R"]
  // },
  // {
  //   name: "BMW",
  //   carNames: ["3 Series", "5 Series", "X1", "X3", "X5", "7 Series", "Z4"]
  // },
  // {
  //   name: "Mercedes-Benz",
  //   carNames: ["C-Class", "E-Class", "S-Class", "GLA", "GLC", "GLE", "A-Class"]
  // },
  // {
  //   name: "Tesla",
  //   carNames: ["Model S", "Model 3", "Model X", "Model Y"]
  // },
  // {
  //   name: "Chevrolet",
  //   carNames: ["Beat", "Cruze", "Spark", "Tavera", "Trailblazer"]
  // },
  // {
  //   name: "Volvo",
  //   carNames: ["XC40", "XC60", "XC90", "S60", "V60", "V90"]
  // },
  // {
  //   name: "Ferrari",
  //   carNames: ["Portofino", "F8 Tributo", "488 Spider", "812 Superfast"]
  // },
  // {
  //   name: "Lamborghini",
  //   carNames: ["Huracan", "Aventador", "Urus"]
  // },
  // {
  //   name: "Porsche",
  //   carNames: ["911", "Cayenne", "Macan", "Panamera", "Taycan"]
  // },
  // {
  //   name: "Suzuki",
  //   carNames: ["Jimny", "Vitara"]
  // },
  // {
  //   name: "Land Rover",
  //   carNames: ["Defender", "Discovery", "Range Rover", "Evoque", "Velar"]
  // },
  // {
  //   name: "Mitsubishi",
  //   carNames: ["Pajero", "Outlander", "Eclipse Cross", "ASX"]
  // },
  // {
  //   name: "Peugeot",
  //   carNames: ["208", "308", "3008", "5008"]
  // },
  // {
  //   name: "Fiat",
  //   carNames: ["500", "Punto", "Linea", "Abarth"]
  // },
  // {
  //   name: "Rolls Royce",
  //   carNames: ["Phantom", "Ghost", "Wraith", "Cullinan"]
  // },
  // {
  //   name: "Jaguar",
  //   carNames: ["XE", "XF", "F-Pace", "I-Pace", "E-Pace"]
  // },
  // {
  //   name: "Maserati",
  //   carNames: ["Ghibli", "Levante", "Quattroporte", "MC20"]
  // }
];

const fetchCarsData = async (budget, selectedFilters) => {
  try {
    const filterQuery = selectedFilters.map(f => `${f.brand}:${f.carName}`).join(',');
    const response = await fetch(
      `http://localhost:3000/api/cars/cars?budgetMin=${budget[0]}&budgetMax=${budget[1]}&filters=${filterQuery}`,
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

    const filteredCars = data
      .filter((car) => {
        const priceInRange = car.price >= budget[0] && car.price <= budget[1];
        
        if (selectedFilters.length === 0) return priceInRange;
        
        return selectedFilters.some(filter => 
          car.brand.toLowerCase() === filter.brand.toLowerCase() && 
          (!filter.carName || car.carName.toLowerCase() === filter.carName.toLowerCase())
        );
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return filteredCars;
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
};

function UsedCars() {
  const [budget, setBudget] = useState([0, 2500000]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedBrands, setExpandedBrands] = useState({});
  const [cart, setCart] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));


  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      try {
        const filteredCars = await fetchCarsData(budget, selectedFilters);
        setCars(filteredCars);
      } catch (error) {
        console.error('Error loading cars:', error);
        setCars([]);
      } finally {
        setLoading(false);
      }
    };
  
    loadCars();
  }, [budget, selectedFilters]);

  const handleBudgetChange = (e) => {
    const newBudget = parseInt(e.target.value);
    setBudget([newBudget, 2500000]);
    if (window.innerWidth < 1024) setShowFilters(false);
  };

  const toggleBrand = (brandName) => {
    setExpandedBrands(prev => ({
      ...prev,
      [brandName]: !prev[brandName]
    }));
  };

  const toggleFilter = (brand, carName = '') => {
    setSelectedFilters(prev => {
      const filterExists = prev.some(
        f => f.brand === brand && f.carName === carName
      );

      if (filterExists) {
        return prev.filter(f => !(f.brand === brand && f.carName === carName));
      } else {
        return [...prev, { brand, carName }];
      }
    });

    if (window.innerWidth < 1024) setShowFilters(false);
  };

  const isFilterSelected = (brand, carName = '') => {
    return selectedFilters.some(f => f.brand === brand && f.carName === carName);
  };

  const handleAddToCart = async (carId) => {
    try {
      if (!token) {
        setShowLoginModal(true);
        return;
      }

      const response = await fetch('http://localhost:3000/api/cart/add', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({ carId }),
      });

      const data = await response.json();

      if (response.ok) {
        setCart(prevCart => [...prevCart, carId]);
        toast.success('Car added to cart successfully!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (response.status === 400 && data.message === 'Already in Add to Cart') {
        toast.info('This car is already in your cart.', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (response.status === 404) {
        toast.error('Car not found. Please refresh the page and try again.', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error('Failed to add to cart');
        toast.error(' Please Login.', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('An error occurred while adding to cart. Please try again.', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleRemoveFromCart = async (carId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/cart/remove/${carId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": 'application/json'
        },
      });

      if (response.ok) {
        setCart(prevCart => prevCart.filter(id => id !== carId));
        toast.success('Car removed from cart successfully!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error('Failed to remove from cart');
        toast.error('Failed to remove car from cart. Please try again.', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('An error occurred while removing from cart. Please try again.', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const isInCart = (carId) => cart.includes(carId);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    setShowLoginModal(false);
  };

  function LoginModal({ isOpen, onClose, onLogin }) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:3000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success && data.data.token) {
          onLogin(data.data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message || "Login failed");
        }
      } catch (err) {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Email address"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4 mb-20 relative">
      <motion.button
        onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden mb-4 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <motion.div 
          className={`col-span-1 lg:sticky lg:top-20 h-fit bg-white rounded-lg shadow-lg p-6 mt-10 max-h-[calc(100vh-6rem)] overflow-y-auto ${showFilters ? 'block' : 'hidden lg:block'}`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-blue-800">Filters</h2>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-blue-700">Budget</h3>
            <input
              type="range"
              min="150000"
              max="2500000"
              step="50000"
              value={budget[0]}
              onChange={handleBudgetChange}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between mt-2 text-sm font-medium text-blue-600">
              <span>₹{(budget[0] / 100000).toFixed(2)}L</span>
              <span>₹{(budget[1] / 100000).toFixed(2)}L</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-700">Brand & Car Names</h3>
            <div className="space-y-1">
              {brandsWithCarNames.map((brand) => (
                <div key={brand.name} className="border-b border-gray-200 pb-1">
                  <div className="flex items-center">
                    <motion.button
                      onClick={() => toggleBrand(brand.name)}
                      className="mr-2 text-gray-500 hover:text-gray-700"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {expandedBrands[brand.name] ? (
                        <FaChevronDown className="w-4 h-4" />
                      ) : (
                        <FaChevronRight className="w-4 h-4" />
                      )}
                    </motion.button>
                    <div className="flex items-center flex-1">
                      <input
                        type="checkbox"
                        id={brand.name}
                        checked={isFilterSelected(brand.name)}
                        onChange={() => toggleFilter(brand.name)}
                        className="mr-2 form-checkbox text-orange-500 focus:ring-orange-500 h-4 w-4"
                      />
                      <label htmlFor={brand.name} className="text-sm font-medium text-blue-700 cursor-pointer flex-1">
                        {brand.name} 
                      </label>
                    </div>
                  </div>
                  <AnimatePresence>
                    {expandedBrands[brand.name] && (
                      <motion.div 
                        className="ml-8 space-y-1"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {brand.carNames.map((carName) => (
                          <div key={carName} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`${brand.name}-${carName}`}
                              checked={isFilterSelected(brand.name, carName)}
                              onChange={() => toggleFilter(brand.name, carName)}
                              className="mr-2 form-checkbox text-orange-500 focus:ring-orange-500 h-3 w-3"
                            />
                            <label
                              htmlFor={`${brand.name}-${carName}`}
                              className="text-xs text-blue-700 cursor-pointer"
                            >
                              {carName}
                            </label>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="col-span-1 lg:col-span-3 mt-10">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No cars found matching your criteria.</p>
              <p className="mt-4 text-gray-500">Try adjusting your filters or budget range.</p>
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
              {cars.map((car) => (
                <motion.div
                  key={car._id}
                  className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200 shadow-md shadow-orange-400 relative"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-48">
                    <img
                      src={car?.images?.[0]?.url || "/placeholder.svg"}
                      alt={`${car.brand || "Brand"} ${car.carName || "Car Name"}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <motion.div
                      className={`absolute top-3 right-3 ${isInCart(car._id) ? 'bg-red-500' : 'bg-white'} text-orange-500 p-2 rounded-full shadow-lg cursor-pointer z-10`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => isInCart(car._id) ? handleRemoveFromCart(car._id) : handleAddToCart(car._id)}
                    >
                      {isInCart(car._id) ? (
                        <FaTrash className="w-5 h-5" />
                      ) : (
                        <FaShoppingCart className="w-5 h-5" />
                      )}
                    </motion.div>
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
                      <div className="flex items-center text-sm text-gray-600">
                        <FaMapMarkerAlt className="h-4 w-4 text-gray-400 mr-1" />
                        Free Test Drive Available
                      </div>
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
            </motion.div>
          )}
        </div>
      </div>
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        onLogin={handleLogin}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default UsedCars;