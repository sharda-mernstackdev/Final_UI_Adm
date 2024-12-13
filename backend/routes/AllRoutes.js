const express = require('express')
const { userSignUpController, userLoginController, userDetailsController, getAllUsers, countUsers, userLogout, updateUser, getActiveUsers, countActiveUsers, last30Days } = require('../controller/userController')
const authMiddleware = require('../middleware/authMiddleware')
const upload = require('../middleware/multer')


const router = express.Router()


router.post("/signup",userSignUpController)
router.post("/login",userLoginController)
router.get("/user-detail",authMiddleware,userDetailsController)
router.get("/getAllUser",getAllUsers)
router.get("/countUser",countUsers)
router.get("/active",getActiveUsers)
router.get("/count-active",countActiveUsers)
router.get("/userLogout/:userId",userLogout)
router.get("/newUser",last30Days)
router.put('/update/:id', authMiddleware, upload.single('profilePicture'), updateUser);




module.exports= router