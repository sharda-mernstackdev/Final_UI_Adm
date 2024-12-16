const express = require('express');
const { getCars, getCarById, createCar, updateCar, deleteCar } = require('../controller/carController');
const  upload  = require('../middleware/multer');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.get('/cars', getCars,);

router.get('/cars/:id', getCarById);
router.post('/newCar',authMiddleware, upload.array('images'),createCar );
router.post('/newCar1', upload.array('images'),createCar );
router.put('/cars/:id',authMiddleware,  updateCar);
router.put('/update/:id', updateCar);
router.delete('/cars/:id',authMiddleware, deleteCar);
router.delete('/delete/:id', deleteCar);

module.exports = router;