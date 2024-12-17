import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaMapMarkerAlt, FaCar, FaGasPump, FaUser, FaChevronRight, FaSearch, FaShoppingCart } from "react-icons/fa";
import { useParams } from 'react-router-dom';

const fetchCartData = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/cart/cart', {
      method: 'GET',
      headers: {
        "content-type": 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cart details');
    }

    const data = await response.json();
    return data[0] || { user: {}, items: [] };
  } catch (error) {
    console.error('Error fetching cart details:', error);
    return { user: {}, items: [] };
  }
};

function CarItem({ item, onRemove, user }) {
  const params = useParams();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        overflow: 'hidden',
        border: '1px solid #f0f0f0',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ position: 'relative', height: '12rem' }}>
        <img
          src={item.car.images[0]?.url || "/placeholder.svg"}
          alt={`${item.car.brand} ${item.car.carName}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemove(item.car._id)}
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            padding: '0.5rem',
            backgroundColor: 'white',
            borderRadius: '9999px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            transition: 'all 0.3s ease',
          }}
        >
          <FaShoppingCart style={{ height: '1.25rem', width: '1.25rem', color: '#f97316' }} />
        </motion.button>
      </div>
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontWeight: '600', fontSize: '1.125rem', color: '#1e40af' }}>
          {item.car.year} {item.car.brand} {item.car.carName}
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500', backgroundColor: '#dbeafe', color: '#1e40af' }}>
            <FaCar style={{ height: '0.75rem', width: '0.75rem', marginRight: '0.25rem' }} />
            {item.car.kilometer} km
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500', backgroundColor: '#dcfce7', color: '#166534' }}>
            <FaGasPump style={{ height: '0.75rem', width: '0.75rem', marginRight: '0.25rem' }} />
            {item.car.fuelType}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500', backgroundColor: '#f3e8ff', color: '#6b21a8' }}>
            <FaUser style={{ height: '0.75rem', width: '0.75rem', marginRight: '0.25rem' }} />
            {item.car.owner}
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#f97316' }}>
            ₹{item.car.price ? (item.car.price / 100000).toFixed(2) : 'N/A'}L
          </div>
        </div>
        <p>{params.id}</p>
        <p>{}</p>
       

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#4b5563' }}>
            <FaMapMarkerAlt style={{ height: '1rem', width: '1rem', color: '#9ca3af', marginRight: '0.25rem' }} />
            Free Test Drive Available
          </div>
          <motion.a
            href={`/carsdata/${item.car._id}`}
            style={{
              display: 'block',
              width: '100%',
              backgroundColor: '#f97316',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              textAlign: 'center',
              fontWeight: '500',
              textDecoration: 'none',
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            View Details
            <FaChevronRight style={{ display: 'inline-block', marginLeft: '0.5rem' }} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

function AddToCartDetails() {
  const [cartData, setCartData] = useState({ user: {}, items: [] });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadCartData = async () => {
      setLoading(true);
      try {
        const data = await fetchCartData();
        setCartData(data);
      } catch (error) {
        console.error('Error loading cart data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCartData();
  }, []);

  const filteredItems = cartData.items.filter(item =>
    item.car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.car.carName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#111827', marginBottom: '1rem' }}>Saved Cars</h1>
        {cartData.user && cartData.user.$oid && (
          <p style={{ marginBottom: '1rem', color: '#4b5563' }}>User ID: {cartData.user.$oid}</p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search cars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                paddingLeft: '2.5rem',
                paddingRight: '1rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                borderWidth: '1px',
                borderColor: '#d1d5db',
                borderRadius: '9999px',
                outline: 'none',
              }}
            />
            <FaSearch style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '500', backgroundColor: '#dbeafe', color: '#1e40af' }}>
            {filteredItems.length} {filteredItems.length === 1 ? 'car' : 'cars'}
          </span>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {[...Array(4)].map((_, index) => (
            <div key={index} style={{ backgroundColor: '#e5e7eb', height: '24rem', borderRadius: '0.75rem', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', backgroundColor: '#f9fafb', borderRadius: '0.75rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>No saved cars found</h2>
          <p style={{ color: '#4b5563', marginBottom: '1rem' }}>Try adjusting your search or explore more cars</p>
          <a
            href="/usedcars"
            style={{
              display: 'inline-block',
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'background-color 0.3s ease',
            }}
          >
            Explore Cars
          </a>
        </div>
      ) : (
        <AnimatePresence>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {filteredItems.map((item) => (
              <CarItem
                key={item.car._id}
                item={item}
             
              />
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default AddToCartDetails;

