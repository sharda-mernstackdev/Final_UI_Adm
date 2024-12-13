import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, createContext } from 'react';
import Dashboard from './components/Dashboard';
import Cars from './components/Cars';
import Users from './components/Users';
import Analytics from './components/Analytics';
import Billing from './components/Billing';
import UploadCar from './components/UploadCar';
import Layout from './components/Layout';
import Settings from './components/Setting';
import ActiveUSer from './components/ActiveUSer';
import TotalUser from './components/TotalUser';
import UserDetails from './components/UserDetails';
import BookTestDrive from './components/BookTestDrive';
import TestDriveDetails from './components/TestDriveDetails';

import AddToCartDetails from './components/AddToCartDetails';
import UserTestDrive from './components/UserTestDriveDetails';
import CarsData from './components/CarsData';
import TotalCars from './components/TotalCars';
import NewUser from './components/NewUser';
import NewCarUpload from './components/NewcarUpload';
import NewcarDetails from './components/NewcarDetails';



export const ThemeContext = createContext(null);

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={darkMode ? 'dark' : ''}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/users" element={<Users />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/upload" element={<UploadCar />} />
              <Route path="/total-user" element={<TotalUser />} />
              <Route path="/active-user" element={<ActiveUSer />} />
              <Route path="/user-details/:id" element={<UserDetails />} />
              <Route path="/test-drive" element={<BookTestDrive />} />
              <Route path="/testDrive-details/:id" element={<TestDriveDetails />} />
              <Route path="/book-drive-details/:id" element={<UserTestDrive />} />
              <Route path="/addToCart-details/:id" element={<AddToCartDetails />} />
              <Route path="/carsdata/:id" element={<CarsData />} />
              <Route path="/total-car" element={<TotalCars/>} />
              <Route path="/new-user" element={<NewUser/>} />
              <Route path="/new-car" element={<NewCarUpload/>} />
              <Route path="/new-car-detail/:id" element={<NewcarDetails/>} />
            
            </Routes>
          </Layout>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

