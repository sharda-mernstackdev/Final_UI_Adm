import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaUserCircle,
  FaChartBar,
  FaSearch,
  FaFilter,
  FaEllipsisV,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

const StatCard = ({ icon: Icon, title, value, change, changeType }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-indigo-100 rounded-lg">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
      </div>
      {change && (
        <span
          className={`px-2.5 py-0.5 text-sm rounded-full ${
            changeType === "increase"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {changeType === "increase" ? "+" : "-"}
          {change}%
        </span>
      )}
    </div>
  </motion.div>
);

function ActiveUserContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // First useEffect for fetching data
  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users/active");
        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        const usersData = Array.isArray(data.data) ? data.data : [];
        setUsers(usersData);
        setFilteredUsers(usersData); // Initialize filtered users with all users
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveUsers();
  }, []);

  // Second useEffect for filtering
  useEffect(() => {
    if (!users.length) return;

    const filtered = users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === "All" || user.role === filterRole;
      return matchesSearch && matchesRole;
    });
    setFilteredUsers(filtered);
  }, [searchTerm, filterRole, users]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Active Users</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <h2 className="text-xl font-semibold text-gray-900">
                Users List
              </h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/admin/user-details/${user._id}`}
                        className="text-sm font-bold text-black-600 hover:text-orange-500"
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                            {user.profile ? (
                              <img
                                src={user.profile}
                                alt="Profile"
                                className="h-10 w-10 rounded-full"
                              />
                            ) : (
                              user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            )}
                          </div>
                          <div className="ml-4">{user.name}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrap the component with ErrorBoundary
function ActiveUser() {
  return (
    <ErrorBoundary>
      <ActiveUserContent />
    </ErrorBoundary>
  );
}

export default ActiveUser;
