const express = require('express');
const { createCar, getCars, updateCar, deleteCar, getCarById } = require('../controller/newCarController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');
const router = express.Router();


const cpUpload = upload.fields([
    { name: 'carImages', maxCount: 10 },
    { name: 'rcImage', maxCount: 1 }
  ]);
  
  router.post('/create', authMiddleware, cpUpload, createCar);
  
router.get('/getCar', getCars);
router.get('/getCar/:id', getCarById);
router.put('/updateCar/:id', updateCar);
router.delete('/deleteCar/:id',authMiddleware, deleteCar);

module.exports = router;