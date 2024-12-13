
import "./App.css";
import Navbar from "./Component/Navbar";
import Login from "./Component/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./Component/Footer";

import Home from "./Component/Home";


import CarsData from "./Component/CarsData";
import Financing from "./Component/Financing";
import Insurance from "./Component/Insurance";
import VehicleHistory from "./Component/VehicleHistory";
import TradeInVlaue from "./Component/TradeInVlaue";
import Showroom from "./Component/Showroom";

import DealerShip from "./Component/DealerShip";
// import TestDriveLocation from './Component/TestDriveLocation'
import MyAppointment from "./Component/MyAppointment";
import MyBooking from "./Component/MyBooking";
import BecomePartner from "./Component/BecomePartner";
import MyOrder from "./Component/MyOrder";
import HelpCenter from "./Component/HelpCenter";
import FAQ from "./Component/FAQ";
import About from "./Component/About";
import ContactUs from "./Component/ContactUs";
import NewCars from "./Component/NewCars";
import Services from "./Component/Services";
import { Echallan } from "./Component/Echallan";
import { Policy } from "./Component/Policy";
import Testimonial from "./Component/Testimonial";
import CarUpload from "./Component/CarUpload";
import Signup from "./Component/Signup";
import { ToastContainer } from "react-toastify";

import UsedCars from "./Component/UsedCars";
import UserDetails from "./Component/UserDetails";
import AddToCart from "./Component/AddToCart";
import ForgotPassword from "./Component/ForgotPassword";
import ProfileSetting from "./Component/ProfileSetting"
import TestDrive from "./Component/TestDrive";
import TestDetails from "./Component/TestDetails";
import TestDriveStatus from "./Component/TestDriveStatus";


function App() {


  return (
    
      <Router>
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>

        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>

        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

        {/* <Routes>
          <Route path="/usedcars" element={<AllCars />} />
        </Routes> */}

        <Routes>
          <Route path="/carsdata/:id" element={<CarsData />} />
        </Routes>

        <Routes>
          <Route path="/testdrive/:id" element={<TestDrive />} />
        </Routes>

         <Routes>
          <Route path="/testdriveStatus" element={<TestDriveStatus />} />
        </Routes>

        

        <Routes>
          <Route path="/testDrive-details/:id" element={<TestDetails />} />
        </Routes>

        <Routes>
          <Route path="/service" element={<Services />} />
        </Routes>

        <Routes>
          <Route path="/financing" element={<Financing />} />
        </Routes>

        <Routes>
          <Route path="/insurance" element={<Insurance />} />
        </Routes>

        <Routes>
          <Route path="/vehicle-history" element={<VehicleHistory />} />
        </Routes>

        <Routes>
          <Route path="/cart" element={<AddToCart />} />
        </Routes>

        <Routes>
          <Route path="/trade-in" element={<TradeInVlaue />} />
        </Routes>

        <Routes>
          <Route path="/showrooms" element={<Showroom />} />
        </Routes>

        <Routes>
          <Route path="/dealerships" element={<DealerShip />} />
        </Routes>

        {/* <Routes>
        <Route path="/test-drive-locations" element={<TestDriveLocation/>} />
      </Routes> */}

        <Routes>
          <Route path="/my-appointments" element={<MyAppointment />} />
        </Routes>

        <Routes>
          <Route path="/my-bookings" element={<MyBooking />} />
        </Routes>

        <Routes>
          <Route path="/my-orders" element={<MyOrder />} />
        </Routes>

        <Routes>
          <Route path="/profile" element={<ProfileSetting />} />
        </Routes>

        <Routes>
          <Route path="/carupload" element={<CarUpload />} />
        </Routes>

        <Routes>
          <Route path="/usedcars" element={<UsedCars />} />
        </Routes>

    

        <Routes>
          <Route path="/help" element={<HelpCenter />} />
        </Routes>

        <Routes>
          <Route path="/faq" element={<FAQ />} />
        </Routes>

        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>

        <Routes>
          <Route path="/contact" element={<ContactUs />} />
        </Routes>

        <Routes>
          <Route path="/sell-car" element={<NewCars />} />
        </Routes>

        <Routes>
          <Route path="/new-car" element={<NewCars />} />
        </Routes>

        <Routes>
          <Route path="/challan" element={<Echallan />} />
        </Routes>

        <Routes>
          <Route path="/terms" element={<Policy />} />
        </Routes>

        <Routes>
          <Route path="/testimonials" element={<Testimonial />} />
        </Routes>

        {/* <Routes>
          <Route path="/" element={<UserDetails/>} />
        </Routes> */}


        <ToastContainer />
        <Footer />
      </Router>
      
  );
}

export default App;
