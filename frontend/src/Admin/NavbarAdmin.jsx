import React, { useState, useEffect } from 'react';
import { MenuIcon, BellIcon, PencilIcon, ChevronDownIcon, LogoutIcon, CogIcon, UserIcon } from '@heroicons/react/outline';

const NavbarAdmin = ({ sidebarOpen, setSidebarOpen }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Gaurav Mohadikar',
    email: 'gauravmohadikar@gmail.com',
    image: 'https://i.pinimg.com/736x/a9/1e/c2/a91ec2b5ef216a128d5efbbd5d6758d2.jpg'
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e) => {
    setUserData(prev => ({ ...prev, name: e.target.value }));
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      console.log('Saving profile changes:', userData);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileOpen && !event.target.closest('.profile-dropdown')) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileOpen]);

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-blue-200 to-orange-400 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* <button
              onClick={() => setSidebarOpen(true)}
              className="text-white focus:outline-none focus:ring-2 focus:ring-white rounded-full p-2 hover:bg-white hover:bg-opacity-20 transition-all duration-300"
            >
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <span className="text-white font-bold text-xl">CreativeApp</span> */}
          </div>

          <div className="flex items-center space-x-4">
            {/* <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-white focus:outline-none focus:ring-2 focus:ring-white rounded-full p-2 hover:bg-white hover:bg-opacity-20 transition-all duration-300"
              >
                <SearchIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              {searchOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl overflow-hidden z-10">
                  <input
                    type="text"
                    className="w-full px-4 py-2 text-gray-800 focus:outline-none"
                    placeholder="Search..."
                    autoFocus
                  />
                  <div className="px-4 py-2 bg-gray-100 text-xs text-gray-500">
                    Press Enter to search
                  </div>
                </div>
              )}
            </div> */}
            
            <button className="text-white focus:outline-none focus:ring-2 focus:ring-white rounded-full p-2 hover:bg-white hover:bg-opacity-20 transition-all duration-300">
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="relative profile-dropdown">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1 hover:bg-white hover:bg-opacity-20 transition-all duration-300"
              >
                <img
                  className="h-8 w-8 rounded-full object-cover border-2 border-white"
                  src={userData.image}
                  alt=""
                />
                <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl overflow-hidden z-10">
                  <div className="p-6 bg-gradient-to-r from-blue-400 via-orange-400 to-red-400 text-white">
                    <div className="relative mx-auto w-24 mb-4">
                      <img
                        src={userData.image}
                        alt=""
                        className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                      />
                      {isEditing && (
                        <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer shadow-lg">
                          <PencilIcon className="h-4 w-4 text-pink-500" />
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                      )}
                    </div>
                    
                    <div className="text-center">
                      {isEditing ? (
                        <input
                          type="text"
                          value={userData.name}
                          onChange={handleNameChange}
                          className="text-center text-xl font-bold bg-transparent border-b-2 border-white focus:outline-none"
                        />
                      ) : (
                        <h2 className="text-xl font-bold">{userData.name}</h2>
                      )}
                      <p className="text-sm opacity-75">{userData.email}</p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <button
                      onClick={toggleEditMode}
                      className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                    >
                      {isEditing ? 'Save Profile' : 'Edit Profile'}
                    </button>
                    
                    <div className="mt-4 space-y-2">
                      <button className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <UserIcon className="h-5 w-5 mr-3 text-gray-400" />
                        View Profile
                      </button>
                      <button className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <CogIcon className="h-5 w-5 mr-3 text-gray-400" />
                        Account Settings
                      </button>
                      <button className="w-full flex items-center px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200">
                        <LogoutIcon className="h-5 w-5 mr-3 text-red-400" />
                        Sign out
                      </button>
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-gray-50 text-xs text-gray-500 flex justify-center space-x-2">
                    <button className="hover:underline">Privacy Policy</button>
                    <span>•</span>
                    <button className="hover:underline">Terms of Service</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};






export default NavbarAdmin
