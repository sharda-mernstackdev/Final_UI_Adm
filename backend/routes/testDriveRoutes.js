const { cancelTestDrive, createTestDrive, deleteTestDrive, getTestDriveById, getTestDrives, updateTestDrive, getTestDrives1 } = require ('../controller/testDriveController')

const express = require ('express');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/create',authMiddleware, createTestDrive);
router.get('/get',authMiddleware, getTestDrives);
router.get('/get1', getTestDrives1);
router.get('/get/:id',authMiddleware, getTestDriveById);
router.get('/get1/:id', getTestDriveById);
router.patch('/update/:id',authMiddleware, updateTestDrive);
router.patch('/:id/cancel',authMiddleware, cancelTestDrive);
router.patch('/:id/cancel1', cancelTestDrive);
router.delete('/delete/:id',authMiddleware, deleteTestDrive);
router.delete('/delete1/:id', deleteTestDrive);

module.exports = router

