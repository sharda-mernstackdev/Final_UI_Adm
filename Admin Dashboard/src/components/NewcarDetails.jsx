import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

const NewcarDetails = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams();
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const nextImage = () => {
    if (carData && carData.carImages) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === carData.carImages.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (carData && carData.carImages) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? carData.carImages.length - 1 : prevIndex - 1
      );
    }
  };

  const fetchCarData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/newCars/getCar/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setCarData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching car:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const editListing = async (updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/newCars/editCar/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update listing');
      }

      const updatedCar = await response.json();
      setCarData(updatedCar);
      // You can add a success message or notification here
    } catch (error) {
      console.error('Error updating car:', error);
      // You can add an error message or notification here
    }
  };

  useEffect(() => {
    fetchCarData();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading car data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!carData) {
    return <div className="no-data">No car data found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Car Details</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side - Image section */}
            <div className="w-full md:w-1/2">
              <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={carData.carImages[currentImageIndex]}
                  alt={`${carData.brand} ${carData.model}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <button
                    onClick={prevImage}
                    className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <span className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {carData.carNumber}
                </span>
              </div>
            </div>

            {/* Right side - Car details */}
            <div className="w-full md:w-1/2">
              <div className="mb-4">
                <div className="flex border-b">
                  <button
                    className={`py-2 px-4 ${activeTab === 'details' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('details')}
                  >
                    Car Details
                  </button>
                  <button
                    className={`py-2 px-4 ${activeTab === 'customer' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('customer')}
                  >
                    Customer Info
                  </button>
                  <button
                    className={`py-2 px-4 ${activeTab === 'documents' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('documents')}
                  >
                    Documents
                  </button>
                </div>
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'details' && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-800">{carData.brand} {carData.model}</h2>
                    <p className="text-gray-600">{carData.variant} - {carData.year}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                          </svg>
                          Registration
                        </span>
                        <span>{carData.regState}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          Kilometers
                        </span>
                        <span>{carData.kms.toLocaleString()} km</span>
                      </div>
                      <hr />
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          Location
                        </span>
                        <span>{carData.carLocation}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                          </svg>
                          Price
                        </span>
                        <span>{carData.price ? `₹${carData.price.toLocaleString()}` : 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'customer' && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Customer Information</h2>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          Customer
                        </span>
                        <span>{carData.customerName}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          Email
                        </span>
                        <span>{carData.customerEmail}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          Phone
                        </span>
                        <span>{carData.phone}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          Owner
                        </span>
                        <span>{carData.ownerName}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${carData.whatsappUpdates ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                        {carData.whatsappUpdates ? "WhatsApp Updates Enabled" : "No WhatsApp Updates"}
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === 'documents' && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Documents</h2>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                          RC Number
                        </span>
                        <span>{carData.rcNumber}</span>
                      </div>
                      <hr />
                      <div>
                        <span className="flex items-center gap-2 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                          RC Image
                        </span>
                        <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={carData.rcImage}
                            alt="RC Document"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-2">
          <button 
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => {
              // You can implement a modal or form to collect updated data
              const updatedData = { /* collect updated data */ };
              editListing(updatedData);
            }}
          >
            Edit Listing
          </button>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
            Approve Listing
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewcarDetails;

