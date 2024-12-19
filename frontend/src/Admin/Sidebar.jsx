import { Link, useLocation } from 'react-router-dom';

import { 
  FaHome, FaUsers, FaCarAlt, FaUpload, FaChartBar, FaCog, FaTimes 
} from "react-icons/fa";
import { 
  MdOutlineDirectionsCar, MdOutlineSettingsSuggest 
} from "react-icons/md";
import { BiStats, BiCar, BiBookOpen } from "react-icons/bi";
import { AiOutlineDashboard } from "react-icons/ai";
const routes = [
  { name: "Dashboard", path: "/admin", icon: AiOutlineDashboard }, // A modern dashboard icon
  { name: "Users", path: "/admin/users", icon: FaUsers }, // User management remains the same
  { name: "Cars", path: "/admin/cars", icon: MdOutlineDirectionsCar }, // Car icon for the car section
  { name: "Upload Car", path: "/admin/upload", icon: FaUpload }, // File upload for uploading cars
  { name: "New Car Uploaded", path: "/admin/new-car", icon: BiCar }, // Focused car icon for new uploads
  { name: "Test Drive Book", path: "/admin/test-drive", icon: BiBookOpen }, // Booking-related icon
  { name: "Settings", path: "/admin/settings", icon: MdOutlineSettingsSuggest }, // Modern settings icon
];

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();

  return (
    <>
      {/* Overlay for small screens */}
      {/* <div
        className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${
          open ? 'block' : 'hidden'
        }`}
        onClick={() => setOpen(false)}
      ></div> */}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 h-[800px] overflow-y-auto transition duration-300 transform bg-orange-600 lg:translate-x-0 lg:static lg:inset-0 ${
          open ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-center mt-8">
        <Link to='/'>
          <div className="flex items-center">
            
            <FaCarAlt className="w-12 h-12 text-white" />
            <span className="mx-2 text-2xl font-semibold text-white">CarAdmin</span>
          </div>
            </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-10">
          {routes.map((route) => (
            <Link
              key={route.name}
              to={route.path}
              className={`flex items-center px-6 py-2 mt-4 duration-200 border-l-4 ${
                location.pathname === route.path
                  ? 'bg-orange-700 bg-opacity-25 text-blue-100 border-blue-100'
                  : 'border-orange-600 text-blue-100 hover:bg-orange-700 hover:bg-opacity-25 hover:text-blue-100'
              }`}
            >
              <route.icon className="w-5 h-5" />
              <span className="mx-4">{route.name}</span>
            </Link>
          ))}
        </nav>

        {/* Close Button for Small Screens */}
        <button
          className="absolute top-4 right-4 lg:hidden"
          onClick={() => setOpen(false)}
        >
          <FaTimes className="w-6 h-6 text-white" />
        </button>
      </div>
    </>
  );
}
