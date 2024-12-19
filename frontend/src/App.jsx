import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Login from "./Component/Login";
import Home from "./Component/Home";
import CarsData from "./Component/CarsData";
import Financing from "./Component/Financing";
import Insurance from "./Component/Insurance";
import VehicleHistory from "./Component/VehicleHistory";
import TradeInVlaue from "./Component/TradeInVlaue";
import Showroom from "./Component/Showroom";
import DealerShip from "./Component/DealerShip";
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
import ProfileSetting from "./Component/ProfileSetting";
import TestDrive from "./Component/TestDrive";
import TestDetails from "./Component/TestDetails";
import TestDriveStatus from "./Component/TestDriveStatus";
import AdminLayout from "./Admin/AdminLayout";
import Dashboard from "./Admin/Dashboard";
import Cars from "./Admin/Cars";
import Analytics from "./Admin/Analytics";
import Billing from "./Admin/Billing";
import Settings from "./Admin/Setting";
import TotalUser from "./Admin/TotalUser";
import ActiveUser from "./Admin/ActiveUSer";
import UploadCar from "./Admin/UploadCar";
import AddToCartDetails from "./Admin/AddToCartDetails";
import NewCarUpload from "./Admin/NewcarUpload";
import NewcarDetails from "./Admin/NewcarDetails";
import Users from "./Admin/Users";
import UserTestDrive from "./Admin/UserTestDriveDetails";
import BookTestDrive from "./Admin/BookTestDrive";
import TestDriveDetails from "./Admin/TestDriveDetails";
import TotalCars from "./Admin/TotalCars";
import NewUser from "./Admin/NewUser";
import CarDetails from "./Admin/CarsData";
import AdminUserDetails from "./Admin/UserDetails";

// Helper to conditionally show Navbar/Footer
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPath && <Navbar />} {/* Show Navbar for non-admin routes */}
      {children} {/* Render all route content */}
      {!isAdminPath && <Footer />} {/* Show Footer for non-admin routes */}
    </>
  );
};

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/carsdata/:id" element={<CarsData />} />
          <Route path="/testdrive/:id" element={<TestDrive />} />
          <Route path="/testdriveStatus" element={<TestDriveStatus />} />
          <Route path="/testDrive-details/:id" element={<TestDetails />} />
          <Route path="/service" element={<Services />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/vehicle-history" element={<VehicleHistory />} />
          <Route path="/cart" element={<AddToCart />} />
          <Route path="/trade-in" element={<TradeInVlaue />} />
          <Route path="/showrooms" element={<Showroom />} />
          <Route path="/dealerships" element={<DealerShip />} />
          <Route path="/my-appointments" element={<MyAppointment />} />
          <Route path="/my-bookings" element={<MyBooking />} />
          <Route path="/my-orders" element={<MyOrder />} />
          <Route path="/profile" element={<ProfileSetting />} />
          <Route path="/carupload" element={<CarUpload />} />
          <Route path="/usedcars" element={<UsedCars />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/sell-car" element={<NewCars />} />
          <Route path="/new-car" element={<NewCars />} />
          <Route path="/challan" element={<Echallan />} />
          <Route path="/terms" element={<Policy />} />
          <Route path="/testimonials" element={<Testimonial />} />

          {/* Admin Panel Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="cars" element={<Cars />} />
            <Route path="users" element={<Users />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="billing" element={<Billing />} />
            <Route path="settings" element={<Settings />} />
            <Route path="upload" element={<UploadCar />} />
            <Route path="total-user" element={<TotalUser />} />
            <Route path="active-user" element={<ActiveUser />} />
            <Route path="user-details/:id" element={<AdminUserDetails />} />
            <Route path="test-drive" element={<BookTestDrive />} />
            <Route path="testDrive-details/:id" element={<TestDriveDetails />} />
            <Route path="book-drive-details/:id" element={<UserTestDrive />} />
            <Route path="addToCart-details/:id" element={<AddToCartDetails />} />
            <Route path="total-car" element={<TotalCars />} />
            <Route path="new-user" element={<NewUser />} />
            <Route path="new-car" element={<NewCarUpload />} />
            <Route path="carsdata/:id" element={<CarDetails />} />
            <Route path="new-car-detail/:id" element={<NewcarDetails />} />
          </Route>
        </Routes>
      </LayoutWrapper>

      {/* Toast Notifications */}
      <ToastContainer />
    </Router>
  );
}

export default App;
