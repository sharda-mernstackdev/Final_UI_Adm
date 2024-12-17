'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import VanillaTilt from 'vanilla-tilt'
import { Link } from 'react-router-dom'

export default function NewCarUpload() {
  const [carData, setCarData] = useState([])
  const tiltRefs = useRef([])

  // Initialize VanillaTilt
  useEffect(() => {
    tiltRefs.current.forEach((ref) => {
      if (ref) {
        VanillaTilt.init(ref, {
          max: 5,
          speed: 400,
          glare: true,
          'max-glare': 0.3,
        })
      }
    })
  }, [carData])

  // Fetch car data from the backend
  const fetchCarsData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/newCars/getCar', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      // Assuming the response is an array of car objects, you can sort them by creation date.
      setCarData(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    } catch (error) {
      console.error('Error fetching cars:', error)
      setCarData([]) // Set empty array on error
    }
  }

  // Fetch car data when the component mounts
  useEffect(() => {
    fetchCarsData()
  }, [])

  // Check if car data is loaded
  if (carData.length === 0) {
    return <div className="loading">Loading car data...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {carData.map((car, index) => (
          <motion.div
            key={car._id}
            ref={(el) => (tiltRefs.current[index] = el)}
            className="bg-white rounded-xl shadow-lg overflow-hidden w-full transform transition-all duration-300 hover:shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Car Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={car.carImages[0]}
                alt={car.model}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
              <motion.div 
                className="absolute bottom-3 left-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-shadow">{car.brand} {car.model}</h2>
                <p className="text-sm font-semibold text-shadow">{car.variant}</p>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Details Grid */}
              <motion.div 
                className="grid grid-cols-2 gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Mileage</p>
                    <p className="text-sm font-semibold text-gray-800">{car.kms} km</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Ownership</p>
                    <p className="text-sm font-semibold text-gray-800">{car.ownerName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Model</p>
                    <p className="text-sm font-semibold text-gray-800">{car.model}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Transmission</p>
                    <p className="text-sm font-semibold text-gray-800">{car.variant}</p>
                  </div>
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h4 className="text-sm font-semibold text-gray-700">Key Features</h4>
                <div className="flex flex-wrap gap-2">
                  {['6 Airbags', 'ABS with EBD', '8" Touchscreen', 'Cruise Control'].map((feature, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full border border-blue-200">
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* View Car Listing Button */}
              <Link to={`/admin/new-car-detail/${car._id}`}>
                <motion.button
                  className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-900 active:scale-95 mt-4"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Car Details
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}