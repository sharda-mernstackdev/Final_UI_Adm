import React, { useEffect, useState } from "react";
import {
  FaFolderPlus,
  FaUserCircle,
  FaChartBar,
  FaSearch,
  FaUsers,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const StatCard1 = ({ icon: Icon, title, value, change, changeType }) => (
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
          <p className="text-sm font-bold text-gray-900">{title}</p>
          <h3 className="text-2xl font-bold text-orange-500">{value}</h3>
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

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [displayCount, setDisplayCount] = useState(5);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Function to fetch users
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/users/getAllUser",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
  
        const data = await response.json();
        setUsers(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())); // Correctly sets users
      } catch (err) {
        setError(err.message); // Sets error in case of failure
      } finally {
        setLoading(false); // Ensures loading state is reset
      }
    };
  
    fetchUsers();
  }, []);
  

  useEffect(() => {
    setDisplayCount(5);
  }, [searchTerm]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
        {/* <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center">
          <FaFolderPlus className="h-5 w-5 mr-2" />
          Add New User
        </button> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link to="/admin/total-user">
          <StatCard1
            icon={FaUsers}
            title="Total Users"
            value={users.length}
            change="12"
            changeType="increase"
          />
        </Link>

        <Link to="/admin/active-user">
          <StatCard1
            icon={FaUserCircle}
            title="Active Users"
            value={users.filter((u) => u.status === "Active").length}
            change="5"
            changeType="increase"
          />
        </Link>

        <Link to="/admin/user">
          <StatCard1
            icon={FaChartBar}
            title="User Growth"
            value="32%"
            change="8"
            changeType="increase"
          />
        </Link>

        <Link to="/admin/new-user">
          <StatCard1
            icon={FaUserCircle}
            title="New Users"
            // value={users.length}
            change="3"
            changeType="decrease"
          />
        </Link>
      </div>                                                                                                                                                                                                                                                                                                                                             

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Users List
          </h2>
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="h-5 w-5 text-gray-500 absolute left-3 top-3" />
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

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.slice(0, displayCount).map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition duration-300 ease-in-out"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/admin/user-details/${user._id}`}
                        className="text-sm font-bold text-black-600 hover:text-orange-500 "
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredUsers.length > displayCount && (
            <div className="mt-4 text-center">
              <Link to='/admin/total-user'
                onClick={() => setDisplayCount((prevCount) => prevCount + 5)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
              >
                View More
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;

