const mongoose = require('mongoose');




const carSchema = new mongoose.Schema({
  carNumber: String,
  brand: String,
  year: Number,
  model: String,
  variant: String,
  regState: String,
  kms: Number,
  customerName: String,
  customerEmail: String,
  ownerName: String,
  carLocation: String,
  phone: Number,
  whatsappUpdates: Boolean,
  carImages: [String],
  rcNumber: Number,
  rcImage: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// Create the Car model


module.exports = mongoose.model('NewCar', carSchema);

