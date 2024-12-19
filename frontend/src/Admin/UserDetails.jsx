import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaCarSide,
  FaUpload,
  FaCalendarAlt,
  FaShoppingCart,
  FaHistory,
} from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';

const AdminCard = ({ title, icon: Icon, onClick, children }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:shadow-xl transition-shadow duration-300"
    onClick={onClick}
  >
    <div className="rounded-full bg-indigo-100 p-4 mb-4">
      <Icon className="w-8 h-8 text-indigo-600" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    {children}
  </motion.div>
);

function AdminUserDetails() {
  const params = useParams(); // Move useParams here

  const [selectedSection, setSelectedSection] = useState(null);

  const handleUpload = () => {
    console.log('Upload triggered');
  };

  const handleTestDrive = () => {
    console.log('Test drive booking triggered');
  };

  const handleAddToCart = () => {
    console.log('Add to cart triggered');
  };

  const handleWatchHistory = () => {
    console.log('Watch history triggered');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Car Management Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your car listings and customer interactions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to={`/admin/addToCart-details/${params.id}`}>
            <AdminCard
              title="Add To Cart"
              icon={FaShoppingCart}
              onClick={handleAddToCart}
            >
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl font-bold text-gray-800">0</span>
                  <span className="text-sm text-gray-500">items in cart</span>
                </div>
                <button className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  View Cart
                </button>
              </div>
            </AdminCard>
          </Link>






          <Link to= {`/admin/book-drive-details/${params.id}`}>
            <AdminCard
              title="Book Test Drive"
              icon={FaCalendarAlt}
              onClick={handleTestDrive}
            >
              <div>0 items</div>
              <div className="mt-4 text-center">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  <FaCarSide className="mr-2" />
                  Schedule Test Drive
                </button>
                <p className="mt-2 text-sm text-gray-500">Manage test drive appointments</p>
              </div>
            </AdminCard>
          </Link>

          

          {/* <AdminCard
            title="Sell Car Uploaded"
            icon={FaUpload}
            onClick={handleUpload}
          >
            <div className="font-semibold">0 items</div>
            <div className="mt-4 text-center">
              <p className="mt-2 text-sm text-gray-500">Upload new car listings</p>
            </div>
          </AdminCard>

          <AdminCard
            title="Car Watch History"
            icon={FaHistory}
            onClick={handleWatchHistory}
          >
            <div className="mt-4 text-center">
              <div className="text-sm text-gray-500 mb-2">Recent Activities</div>
              <div className="space-y-1">
                <div className="text-xs text-gray-600">Last viewed: 2 hours ago</div>
                <div className="text-xs text-gray-600">Total views today: 24</div>
              </div>
            </div>
          </AdminCard> */}
        </div>
      </div>
    </div>
  );
}

export default AdminUserDetails;
