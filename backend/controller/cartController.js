const asyncHandler = require('express-async-handler');
const Cart = require('../model/cart.js');
const Car = require('../model/carModel.js');

const addToCart = asyncHandler(async (req, res) => {
  const { carId } = req.body;

  const car = await Car.findById(carId);
  if (!car) {
    res.status(404);
    throw new Error('Car not found');
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    const carItemIndex = cart.items.findIndex(item => item.car.toString() === carId);

    if (carItemIndex > -1) {
      cart.items[carItemIndex].quantity += 1;
    } else {
      cart.items.push({ car: carId, quantity: 1 });
    }

    cart = await cart.save();
  } else {
    cart = await Cart.create({
      user: req.user._id,
      items: [{ car: carId, quantity: 1 }]
    });
  }

  res.status(201).json(cart);
});

const removeFromCart = asyncHandler(async (req, res) => {
  const { carId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  cart.items = cart.items.filter(item => item.car.toString() !== carId);

  if (cart.items.length === 0) {
    await Cart.deleteOne({ _id: cart._id });
    return res.status(200).json({ message: 'Cart is empty and has been deleted', success: true });
  }

  await cart.save();

  res.status(200).json({ message: 'Car removed from cart', success: true });
});






const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.car');

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  res.status(200).json(cart);
});



const getAllCarts = asyncHandler(async (req, res) => {
  try {
    const carts = await Cart.find({}).populate('items.car'); // Populate 'car' if it references another collection
    if (!carts || carts.length === 0) {
      return res.status(404).json({ message: 'No carts found' });
    }
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart data', error: error.message });
  }
});






const countAddToCartProduct = asyncHandler(async (req, res) => {
  const count = await Cart.countDocuments({ user: req.user._id });

  res.status(200).json({
    count: count,
    message: "Cart count retrieved successfully",
    success: true
  });
});

module.exports = { addToCart, removeFromCart, getCart, countAddToCartProduct,getAllCarts };