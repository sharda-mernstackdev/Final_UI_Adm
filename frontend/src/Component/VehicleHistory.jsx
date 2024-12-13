import React from 'react';

const vehicle = {
  make: 'Toyota',
  model: 'Crysta',
  year: 2018,
  mileage: 35000,
  color: 'Blue',
  transmission: 'Automatic',
  serviceHistory: [
    'Oil change - 2023-01-15',
    'Tire rotation - 2023-03-20',
    'Brake inspection - 2023-05-10',
  ],
};

const VehicleHistory = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-7 mb-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        {vehicle.make} {vehicle.model}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vehicle Details */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">Vehicle Details</h2>
          <p className="text-gray-700 mb-2">
            <strong>Year:</strong> {vehicle.year}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Mileage:</strong> {vehicle.mileage.toLocaleString()} miles
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Color:</strong> {vehicle.color}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Transmission:</strong> {vehicle.transmission}
          </p>
        </div>

        {/* Service History */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">Service History</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            {vehicle.serviceHistory.map((service, index) => (
              <li key={index} className="hover:text-blue-600 transition-colors duration-200">
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VehicleHistory
