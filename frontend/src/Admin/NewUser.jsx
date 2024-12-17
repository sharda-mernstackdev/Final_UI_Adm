import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function NewUser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]); // Initialize users as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users/newUSer", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
  
        const result = await response.json();
  
        // Check if the result has a data property and it's an array
        if (result.success && Array.isArray(result.data)) {
          setUsers(result.data); // Set users to the 'data' array
        } else {
          console.error("Fetched data is not an array", result);
          setError("Data is not an array");
        }
      } catch (err) {
        setError(err.message); // Set error message in case of failure
      } finally {
        setLoading(false); // Reset loading state
      }
    };
  
    fetchUsers();
  }, []); // Empty dependency array to run the effect once when the component mounts
  

  // Filter users based on the search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">New Users</h1>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Users List</h2>
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

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition duration-300"
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
        </div>
      </div>
    </div>
  );
}

export default NewUser;
