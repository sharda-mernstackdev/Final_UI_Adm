const express = require('express');
const cors = require('cors');
const {connectDB}  = require('./db.js');
const userRoutes = require('./routes/AllRoutes.js');
const carsRoutes= require ('./routes/carRoutes.js')
const cartRoutes = require ('./routes/cartRoutes.js')
const TestDriveRoutes = require ('./routes/testDriveRoutes.js')
const newCarRoutes = require ('./routes/newCarRoutes.js')
const app = express();
const port = 3000;


connectDB();

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
}));
// Middleware to parse JSON
app.use(express.json());
//deploy
// Use routes
app.use("/api/users", userRoutes);
app.use("/api/cars", carsRoutes );
app.use('/api/cart', cartRoutes);
app.use('/api/testDrive', TestDriveRoutes)
app.use('/api/newCars', newCarRoutes )
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
