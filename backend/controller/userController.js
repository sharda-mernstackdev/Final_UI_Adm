const userModel = require("../model/useModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

const cloudinary = require ('../cloudinary')

//=============================================Sign Up USer Controller ==============================================

async function userSignUpController(req, res) {
    try {
      const { email, password, name } = req.body;
  
      // Check if the user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }
  
      // Validate required fields
      if (!email) throw new Error('Please provide an email');
      if (!password) throw new Error('Please provide a password');
      if (!name) throw new Error('Please provide a name');
  
      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      if (!hashPassword) {
        throw new Error('Something went wrong while hashing the password');
      }
  
      // Handle profile picture upload if provided
      let profileUrl = null;
      if (req.file) {
        const uploadToCloudinary = async (file) => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: 'profile_pictures' },
              (error, result) => {
                if (error) {
                  console.error('Cloudinary upload error:', error);
                  reject(error);
                } else {
                  resolve(result.secure_url); // Return the URL of the uploaded image
                }
              }
            );
            stream.end(file.buffer); // Use multer memory storage buffer
          });
        };
  
        try {
          profileUrl = await uploadToCloudinary(req.file);
        } catch (uploadError) {
          throw new Error('Error uploading profile picture');
        }
      }
  
      // Prepare the user payload
      const payload = {
        name,
        email,
        password: hashPassword,
        profile: profileUrl, // Save the profile picture URL if available
      };
  
      // Save the new user to the database
      const newUser = new userModel(payload);
      const savedUser = await newUser.save();
  
      res.status(201).json({
        data: savedUser,
        success: true,
        error: false,
        message: 'User created successfully!',
      });
    } catch (error) {
      console.error('Error in userSignUpController:', error.message || error);
      res.status(400).json({
        message: error.message || 'An error occurred',
        error: true,
        success: false,
      });
    }
  }





//   ======================================Login Controller============================================================



async function userLoginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the password is correct
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      // Update user status to active
      user.status = 'Active';
      await user.save();

      // Generate the token
      const tokenData = {
        _id: user._id,
        email: user.email,
      };

      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "8h", // 8 hours expiration
      });

      // Send the token in the JSON response
      res.status(200).json({
        message: "Login Successful",
        data: { token, userId: user._id },
        success: true,
        error: false,
      });
    } else {
      throw new Error("Please check password");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message || "An error occurred",
      error: true,
      success: false,
    });
  }
}




//   ======================================Fetch user Details Controller============================================================



async function userDetailsController(req, res) {
    try {
      console.log("userId", req.user._id); // Changed from req._id to req.user._id
      const user = await userModel.findById(req.user._id);
  
      if (!user) {
        throw new Error("User not found");
      }
  
      res.status(200).json({
        data: user,
        error: false,
        success: true,
        message: "User details retrieved successfully"
      });
  
      console.log("user", user);
  
    } catch (err) {
      res.status(400).json({
        message: err.message || "Error retrieving user details",
        error: true,
        success: false
      });
    }
  }


  //   ======================================Logout Controller============================================================

  const userLogout = async (req, res) => {
    try {
      const { userId } = req.params; // Get userId from the URL
  
      if (!userId) {
        throw new Error("Please provide userId");
      }
  
      // Update user status to inactive
      const user = await userModel.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
  
      user.status = 'Inactive';
      await user.save();
  
      // Clear the token from cookies
      res.clearCookie("token");
  
      res.json({
        message: "Logged out successfully",
        error: false,
        success: true,
        data: [],
      });
    } catch (err) {
      res.status(400).json({
        message: err.message || "An error occurred during logout",
        error: true,
        success: false,
      });
    }
  };


// ======================================Update User Controller============================================================


const updateUser = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Validate the user making the request
      if (!req.user || req.user._id.toString() !== userId) {
        return res.status(403).json({ message: 'Unauthorized to update this user' });
      }
  
      // Ensure there's data to update
      if (!req.body && !req.file) {
        return res.status(400).json({ message: 'No data provided to update' });
      }
  
      let updateData = { ...req.body };
  
      // Handle profile picture upload if a new picture is provided
      if (req.file) {
        const uploadToCloudinary = async (file) => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: 'profile_pictures', public_id: `user_${userId}`, overwrite: true },
              (error, result) => {
                if (error) {
                  console.error('Cloudinary upload error:', error);
                  reject(error);
                } else {
                  resolve(result.secure_url); // Return the secure URL of the uploaded picture
                }
              }
            );
            stream.end(file.buffer); // Use multer memory storage buffer
          });
        };
  
        try {
          // Upload the new profile picture to Cloudinary
          const profilePictureUrl = await uploadToCloudinary(req.file);
          updateData.profile = profilePictureUrl; // Add the uploaded URL to the update data
        } catch (error) {
          console.error('Error uploading profile picture:', error);
          return res.status(500).json({ message: 'Error uploading profile picture' });
        }
      }
  
      // Update the user's data in the database
      const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Respond with the updated user data
      res.status(200).json({
        message: 'User updated successfully',
        success: true,
        user: updatedUser,
      });
    } catch (error) {
      console.error('Error in updateUser controller:', error);
      res.status(500).json({
        message: 'Error updating user',
        success: false,
        error: error.message,
      });
    }
  };


//   ======================================get All USer Controller============================================================


const getAllUsers = async (req, res) => {
    try {
      const users = await userModel.find({});
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };


//   ======================================Count USer Controller============================================================


  const countUsers = async (req, res) => {
    try {
      const userCount = await userModel.countDocuments();
      res.status(200).json({ count: userCount });
    } catch (err) {
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };


  //   ======================================Get  Active  USer Controller============================================================


  const getActiveUsers = async (req, res) => {
    try {
      const activeUsers = await userModel.find({ status: 'Active' }); // Find users with status 'active'
      res.status(200).json({
        message: "Active users retrieved successfully",
        data: activeUsers,
        success: true,
        error: false,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || "An error occurred",
        success: false,
        error: true,
      });
    }
  };

//   ======================================Count  Active  USer Controller===============================================


  const countActiveUsers = async (req, res) => {
    try {
      const activeUserCount = await userModel.countDocuments({ status: 'Active' }); // Count users with status 'active'
      res.status(200).json({
        message: "Active users count retrieved successfully",
        data: { activeUserCount },
        success: true,
        error: false,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || "An error occurred",
        success: false,
        error: true,
      });
    }
  };





  const last30Days = async (req, res) => {
    try {
      // Calculate the date 30 days ago
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 1);
  
      // Fetch users with createdAt >= 30 days ago
      const users = await userModel.find({ createdAt: { $gte: thirtyDaysAgo } }).sort({ createdAt: -1 });
  
      // Send response
      res.status(200).json({
        success: true,
        message: 'Users registered in the last 30 days fetched successfully',
        data: users,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch users registered in the last 30 days',
        error: error.message,
      });
    }
  };




  
module.exports = {userSignUpController, userLoginController, userDetailsController, userLogout, updateUser, getAllUsers, countUsers,getActiveUsers, countActiveUsers, last30Days  };
