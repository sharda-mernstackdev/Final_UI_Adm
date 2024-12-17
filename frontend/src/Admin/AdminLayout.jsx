import React from "react";
import { Outlet } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  const styles = {
    adminLayout: {
      display: "flex",
      flexDirection: "column",
      height: "100vh", // Full height of the viewport
    },
    adminContainer: {
      display: "flex",
      flex: 1,
      overflow: "hidden", // Prevent content overflow
    },
    adminContent: {
      flex: 1, // Take up the remaining space next to the sidebar
      padding: "20px",
      overflowY: "auto", // Enable scrolling for long content
      backgroundColor: "#f8f9fa", // Light background for content area
    },
    sidebar: {
      width: "250px", // Fixed width for the sidebar
      backgroundColor: "#343a40", // Sidebar background color
      color: "white",
      height: "100vh", // Full height for the sidebar
      position: "sticky", // Keep sidebar fixed during scrolling
      top: 0,
    },
  };

  return (
    <div style={styles.adminLayout}>
      {/* Admin Navbar */}
      <NavbarAdmin />

      <div style={styles.adminContainer}>
        {/* Admin Sidebar */}
        <div style={styles.sidebar}>
          <Sidebar />
        </div>

        {/* Admin Content */}
        <div style={styles.adminContent}>
          <Outlet /> {/* Render nested routes */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
