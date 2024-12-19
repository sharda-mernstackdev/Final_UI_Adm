import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, User, Fuel, Gauge, Share2, Zap, Shield, Award, X, ZoomIn, Facebook, Twitter, Linkedin, Link, Edit2, Save } from 'lucide-react';
import { IoMdColorFill } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { useParams } from 'react-router-dom';

const CarDetails = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
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
        setEditedData(dataResponse);
      } catch (error) {
        console.error('Error fetching car details:', error);
        setError('Failed to fetch car details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [params?.id]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data?.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + data?.images.length) % data?.images.length);
  };

  const openZoomModal = () => {
    setShowZoomModal(true);
  };

  const closeZoomModal = () => {
    setShowZoomModal(false);
  };

  const openShareModal = () => {
    setShowZoomModal(false);
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  const shareUrl = `${window.location.origin}/cars/${data?._id}`;

const shareViaFacebook = () => {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
};

const shareViaTwitter = () => {
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Check out this ${data?.carName} ${data?.brand}!`)}`, '_blank');
};

const shareViaLinkedIn = () => {
  window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(`${data?.carName} ${data?.brand}`)}&summary=${encodeURIComponent(data?.description)}`, '_blank');
};

const shareViaWhatsApp = () => {
  window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this ${data?.carName} ${data?.brand}! ${shareUrl}`)}`, '_blank');
};
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Link copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy link: ', err);
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/cars/update/${params?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update car details');
      }

      const updatedData = await response.json();
      setData(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating car details:', error);
      setError('Failed to update car details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

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
                {isEditing ? (
                  <input
                    type="text"
                    name="carName"
                    value={editedData.carName}
                    onChange={handleInputChange}
                    className="w-full text-4xl font-bold text-gray-900 border-b-2 border-orange-500 focus:outline-none"
                  />
                ) : (
                  data.carName
                )}
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
                {isEditing ? (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300"
                    aria-label="Save"
                  >
                    <Save className="w-6 h-6" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEdit}
                    className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-300"
                    aria-label="Edit"
                  >
                    <Edit2 className="w-6 h-6" />
                  </motion.button>
                )}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl font-semibold text-orange-600 mb-6"
            >
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="brand"
                    value={editedData.brand}
                    onChange={handleInputChange}
                    className="w-1/2 text-2xl font-semibold text-orange-600 border-b-2 border-orange-500 focus:outline-none"
                  />
                  {' | '}
                  <input
                    type="number"
                    name="year"
                    value={editedData.year}
                    onChange={handleInputChange}
                    className="w-1/4 text-2xl font-semibold text-orange-600 border-b-2 border-orange-500 focus:outline-none"
                  />
                </>
              ) : (
               ` ${data.brand} | ${data.year}`
              )}
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
                    {isEditing ? (
                      <input
                        type="number"
                        name="year"
                        value={editedData.year}
                        onChange={handleInputChange}
                        className="w-full border-b-2 border-orange-500 focus:outline-none"
                      />
                    ) : (
                      <span>{data.year}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Gauge className="w-5 h-5 mr-2 text-orange-500" />
                    {isEditing ? (
                      <input
                        type="number"
                        name="kilometer"
                        value={editedData.kilometer}
                        onChange={handleInputChange}
                        className="w-full border-b-2 border-orange-500 focus:outline-none"
                      />
                    ) : (
                      <span>{data.kilometer} km</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Fuel className="w-5 h-5 mr-2 text-orange-500" />
                    {isEditing ? (
                      <input
                        type="text"
                        name="fuelType"
                        value={editedData.fuelType}
                        onChange={handleInputChange}
                        className="w-full border-b-2 border-orange-500 focus:outline-none"
                      />
                    ) : (
                      <span>{data.fuelType}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <IoMdColorFill className="w-5 h-5 mr-2 text-orange-500" />
                    {isEditing ? (
                      <input
                        type="text"
                        name="color"
                        value={editedData.color}
                        onChange={handleInputChange}
                        className="w-full border-b-2 border-orange-500 focus:outline-none"
                      />
                    ) : (
                      <span>{data.color}</span>
                    )}
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
                    {isEditing ? (
                      <input
                        type="number"
                        name="owner"
                        value={editedData.owner}
                        onChange={handleInputChange}
                        className="w-full border-b-2 border-orange-500 focus:outline-none"
                      />
                    ) : (
                      <span>{data.owner} owner(s)</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-orange-500" />
                    {isEditing ? (
                      <input
                        type="text"
                        name="vehicleNumber"
                        value={editedData.vehicleNumber}
                        onChange={handleInputChange}
                        className="w-full border-b-2 border-orange-500 focus:outline-none"
                      />
                    ) : (
                      <span>{data.vehicleNumber}</span>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Description</h3>
              {isEditing ? (
                <textarea
                  name="description"
                  value={editedData.description}
                  onChange={handleInputChange}
                  className="w-full h-32 p-2 border-2 border-orange-500 rounded-md focus:outline-none"
                />
              ) : (
                <>
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
                </>
              )}
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                {isEditing ? (
                  <input
                    type="number"
                    name="price"
                    value={editedData.price}
                    onChange={handleInputChange}
                    className="text-4xl font-bold text-gray-900 w-full border-b-2 border-orange-500 focus:outline-none"
                  />
                ) : (
                  <span className="text-4xl font-bold text-gray-900">₹{data.price.toLocaleString()}</span>
                )}
              </div>
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
    </div>
  );
};

export default CarDetails;




