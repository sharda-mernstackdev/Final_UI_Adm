const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  profile: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Inactive',
  },
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
