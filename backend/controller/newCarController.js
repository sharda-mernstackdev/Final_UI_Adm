const Car = require('../model/newCarModel');
const cloudinary = require('../cloudinary');

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );
    stream.end(file.buffer);
  });
};

const createCar = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!req.files || !req.files.carImages || !req.files.rcImage) {
      return res.status(400).json({ message: 'Both car images and RC image are required.' });
    }

    const carImageUrls = [];
    let rcImageUrl = '';

    // Upload car images
    for (const file of req.files.carImages) {
      try {
        const uploadResult = await uploadToCloudinary(file);
        carImageUrls.push(uploadResult);
      } catch (uploadError) {
        console.error("Error uploading car image:", uploadError);
      }
    }

    // Upload RC image
    try {
      rcImageUrl = await uploadToCloudinary(req.files.rcImage[0]);
    } catch (uploadError) {
      console.error("Error uploading RC image:", uploadError);
    }

    // Create a new Car instance with image URLs
    const newCar = new Car({
      ...req.body,
      author: req.user._id,
      carImages: carImageUrls,
      rcImage: rcImageUrl,
    });

    await newCar.save();

    res.status(201).json({
      message: "Car created successfully",
      success: true,
      car: newCar,
    });
  } catch (error) {
    console.error("Error in createCar controller:", error);
    res.status(500).json({ message: 'Error creating car with images' });
  }
};



const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCar) return res.status(404).json({ message: 'Car not found' });
    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) return res.status(404).json({ message: 'Car not found' });
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createCar, getCars, getCarById, updateCar, deleteCar };

