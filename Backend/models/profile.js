// Assuming you have installed and imported necessary modules (express, mongoose, etc.)

const mongoose = require('mongoose');

// Define the data schema for the user profile
const profileSchema = new mongoose.Schema({
  // user_identification: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'details'
  // },
  // registered_username:{
    // type: String,
    // required : true,
  // },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  education: {

    type: String,
    default: "", // Set a default value for the education field

  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  profilePicture: {
    type: String, // You can use String to store the file path or use Buffer for storing the image file
default:""
  },
  city: {
    type: String,
    required: true,
  },
  jobPreferences: {
    type: String,
    required: true,
  },
  alumniDetails: {
    type: String,
    required: true,
  },
  previousExperiences: {
    type: String,
    required: true,
  },
  cv: {
    type: String, // You can use String to store the file path or use Buffer for storing the CV file\
    default:"",
  },
});

// Create a mongoose model using the schema
const Profile = mongoose.model('profiles', profileSchema);

module.exports = Profile;
