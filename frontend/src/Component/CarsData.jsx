import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, User, Fuel, Gauge, Heart, DollarSign, Star, Share2, Zap, Shield, Award, X, ZoomIn, Facebook, Twitter, Linkedin, Link, Eye, EyeOff } from 'lucide-react';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { IoMdColorFill } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';

export function CarsData() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

// =================================================================================
const [loanAmount, setLoanAmount] = useState(data?.price || 1500000); // Updated initial state
const [interestRate, setInterestRate] = useState(8.5);
const [loanTenure, setLoanTenure] = useState(60);
const [downPayment, setDownPayment] = useState(data?.price ? data.price * 0.2 : 0); // Updated initial state
const [emi, setEmi] = useState(0);
const [totalInterest, setTotalInterest] = useState(0);
const [totalAmount, setTotalAmount] = useState(0);

useEffect(() => {
  calculateEMI();
}, [loanAmount, interestRate, loanTenure, downPayment]);

const calculateEMI = () => {
  const principal = loanAmount - downPayment;
  const monthlyRate = interestRate / 12 / 100;
  const numberOfPayments = loanTenure;

  const emiAmount = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  const totalPayment = emiAmount * numberOfPayments;
  const totalInterestPayment = totalPayment - principal;

  setEmi(emiAmount);
  setTotalInterest(totalInterestPayment);
  setTotalAmount(totalPayment);
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
};

// ====================================================================

  const fetchCarDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/cars/cars/${params?.id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch car details');
      }

      const dataResponse = await response.json();
      console.log('API Response:', dataResponse);
      setData(dataResponse);
    } catch (error) {
      console.error('Error fetching car details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarDetails();
  }, [params?.id]);

  useEffect(() => {
    setLoanAmount(data?.price || 1500000);
    setDownPayment(data?.price ? data.price * 0.2 : 0);
  }, [data?.price]);


  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (data.success && data.data.token) {
        setIsAuthenticated(true);
        setShowLoginModal(false);
        localStorage.setItem('token', data.data.token);
        alert(data.message); // Replace with proper toast notification
        navigate(`/testdrive/${params.id}`); // Navigate to the test drive booking page
      } else {
        alert(data.message || "Login failed"); // Replace with proper toast notification
      }
    } catch (err) {
      alert("Something went wrong. Please try again."); // Replace with proper toast notification
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-orange-50">
        <motion.div
          className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full"
          // animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-orange-50">
        <p className="text-2xl text-gray-600">No car data available.</p>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + data.images.length) % data.images.length);
  };

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const openZoomModal = () => {
    setShowZoomModal(true);
  };

  const closeZoomModal = () => {
    setShowZoomModal(false);
  };

  const openShareModal = () => {
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };


  const shareUrl = `${window.location.origin}/cars/${data._id}`;

  const shareViaFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };
  
  const shareViaTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Check out this ${data.carName} ${data.brand}!`)}`, '_blank');
  };
  
  const shareViaLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(`${data.carName} ${data.brand}`)}&summary=${encodeURIComponent(data.description)}`, '_blank');
  };
  
  const shareViaWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this ${data.carName} ${data.brand}! ${shareUrl}`)}`, '_blank');
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Link copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy link: ', err);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-orange-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="md:flex">
          <div className="md:w-1/2 p-4">
            <div className="relative h-64 sm:h-80 md:h-96 mb-4 group">
              <motion.img
                key={currentImageIndex}
                src={data.images[currentImageIndex].url}
                alt={`${data.carName} - View ${currentImageIndex + 1}`}
                className="w-full h-full object-cover rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <button
                  onClick={openZoomModal}
                  className="text-white text-lg font-semibold flex items-center"
                >
                  <ZoomIn className="w-6 h-6 mr-2" />
                  Click to zoom
                </button>
              </motion.div>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 hover:bg-opacity-100 transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-orange-600" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 hover:bg-opacity-100 transition-all"
              >
                <ChevronRight className="w-6 h-6 text-orange-600" />
              </button>
            </div>
            <div className="flex justify-center space-x-2 overflow-x-auto py-2">
              {data.images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden transition-all duration-300 ${
                    index === currentImageIndex ? 'ring-2 ring-orange-500 scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={image.url} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 p-8">
            <div className="flex justify-between items-center mb-4">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl font-bold text-gray-900"
              >
                {data.carName}
              </motion.h2>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openShareModal}
                  className="p-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors duration-300"
                  aria-label="Share"
                >
                  <Share2 className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl font-semibold text-orange-600 mb-6"
            >
              {data.brand} | {data.year}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex space-x-4 mb-6"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <Zap className="w-4 h-4 mr-1" />
                Excellent condition
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <Shield className="w-4 h-4 mr-1" />
                Certified
              </span>
            </motion.div>
            <div className="mb-6">
              <div className="flex space-x-4 mb-2">
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-orange-500" />
                    <span>{data.brand}</span>
                  </div>
                  <div className="flex items-center">
                    <Gauge className="w-5 h-5 mr-2 text-orange-500" />
                    <span>{data.kilometer} km</span>
                  </div>
                  <div className="flex items-center">
                    <Fuel className="w-5 h-5 mr-2 text-orange-500" />
                    <span>{data.fuelType}</span>
                  </div>
                  <div className="flex items-center">
                    <IoMdColorFill className="w-5 h-5 mr-2 text-orange-500" />
                    <span>{data.color}</span>
                  </div>
                </motion.div>
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 gap-4 mt-3"
                >
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-orange-500" />
                    <span>{data.owner} owner(s)</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-orange-500" />
                    <span>{data.vehicleNumber}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Description</h3>
              <p className={`text-gray-600 ${showFullDescription ? '' : 'line-clamp-3'}`}>
                {data.description}
              </p>
              {data.description.length > 150 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-orange-500 hover:text-orange-600 mt-2 focus:outline-none"
                >
                  {showFullDescription ? 'Read less' : 'Read more'}
                </motion.button>
              )}
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <span className="text-4xl font-bold text-gray-900">₹{data.price.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-grow"
              >
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      setShowLoginModal(true);
                    } else {
                      navigate(`/testdrive/${data._id}`);
                    }
                  }}
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 text-center"
                >
                  Book Test Drive
                </button>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300"
              >
                Contact Seller
              </motion.button>
              {/* {isAuthenticated && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300"
                >
                  Logout
                </motion.button>
              )} */}
            </div>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {showZoomModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          >
            <div className="max-w-4xl w-full p-4">
              <motion.img
                src={data.images[currentImageIndex].url}
                alt={`${data.carName} - Zoomed View`}
                className="w-full h-auto max-h-[80vh] object-contain"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeZoomModal}
                className="absolute top-4 right-4 text-white hover:text-gray-300"
              >
                <X className="w-8 h-8" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-sm w-full"
            >
              <h3 className="text-xl font-semibold mb-4">Share this car</h3>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareViaFacebook}
                  className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-full"
                >
                  <Facebook className="w-5 h-5 mr-2" />
                  Facebook
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareViaTwitter}
                  className="flex items-center justify-center bg-blue-400 text-white py-2 px-4 rounded-full"
                >
                  <Twitter className="w-5 h-5 mr-2" />
                  Twitter
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareViaLinkedIn}
                  className="flex items-center justify-center bg-blue-700 text-white py-2 px-4 rounded-full"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareViaWhatsApp}
                  className="flex items-center justify-center bg-green-500 text-white py-2 px-4 rounded-full"
                >
                  <FaWhatsapp className="w-5 h-5 mr-2" />
                  WhatsApp
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyLinkToClipboard}
                  className="flex items-center justify-center bg-gray-200 text-gray-800 py-2 px-4 rounded-full col-span-2"
                >
                  <Link className="w-5 h-5 mr-2" />
                  Copy Link
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeShareModal}
                className="mt-4 w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-full"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-sm w-full"
            >
              <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm text-gray-700">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    placeholder="Email address"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      placeholder="Password"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </form>
              <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account?{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Sign Up
                </a>
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLoginModal(false)}
                className="mt-4 w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-full"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* =========================================================================================================== */}

      {/* =======================================EMI Calculator*=================================================== */}

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8 font-sans text-white mt-10">
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl">
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-orange-500 to-blue-600 text-transparent bg-clip-text">
            Car EMI Calculator
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Car Amount</label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full bg-white/5 rounded-md border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="range"
                  min={data.price / 2}
                  max={data.price * 1.5}
                  step={1000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer mt-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Down Payment</label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full bg-white/5 rounded-md border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="range"
                  min={0}
                  max={loanAmount / 2}
                  step={1000}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer mt-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Interest Rate (%)</label>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full bg-white/5 rounded-md border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer mt-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Select (Months)</label>
                <input
                  type="number"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="w-full bg-white/5 rounded-md border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="range"
                  min="12"
                  max="84"
                  step="1"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer mt-2"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <motion.div 
                className="text-center mb-8"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-400 mb-2">Your Monthly EMI</p>
                <p className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 text-transparent bg-clip-text">
                  {formatCurrency(Math.round(emi))}
                </p>
              </motion.div>
              <div className="w-full max-w-md">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200">
                        Principal
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                        Interest
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                    <motion.div
                      style={{ width: `${(loanAmount - downPayment) / totalAmount * 100}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(loanAmount - downPayment) / totalAmount * 100}%` }}
                      transition={{ duration: 1 }}
                    />
                    <motion.div
                      style={{ width: `${totalInterest / totalAmount * 100}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${totalInterest / totalAmount * 100}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-6 mt-4">
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-400">Principal Amount</span>
                    <span className="font-semibold">{formatCurrency(loanAmount - downPayment)}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-400">Total Interest</span>
                    <span className="font-semibold">{formatCurrency(Math.round(totalInterest))}</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-orange-500 to-blue-600 mb-4"></div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Amount Payable</span>
                    <span className="font-semibold">{formatCurrency(Math.round(totalAmount))}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default CarsData;