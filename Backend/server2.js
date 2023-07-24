const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const corsOptions = require('./corsOptions');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var fetchuser = require('./middlewear/fetchuser');
const JWT_SECRET = "hdkjvdhdvsjsvdl11246676jnj";
const Profile = require('./models/profile');
const multer = require('multer');


app.use(cors(corsOptions));

const url = "mongodb+srv://user1:kmit1@cluster0.7pq8ivp.mongodb.net/Cguru?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connection Established"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

// Define the schema for the "details" model
const detailsSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Register the "details" model
const attempt = mongoose.model("details", detailsSchema);

app.post("/post", async (req, res) => {
  console.log(req.body);
  res.send("Hai hai");
});

app.post("/reg", (req, res) => {
  console.log("I am here");
  const { uname, email, password } = req.body;

  try {
    console.log(uname, '\n');
    console.log(email, '\n');
    console.log(password, '\n');
    attempt.create({
      UserName: uname,
      email: email,
      password: password,
    });
  } catch (error) {
    console.log(error);
  }

  res.send({ msg: "ok" });
});

app.post("/signin", async (req, res) => {
  let success = false;
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await attempt.findOne({ email });


    if (!user) {
      success = false;
      return res.status(404).json({ error: "User not found" });
    }
    // console.log("I got it: ", user.email);

    let passwordCompare = () => {
      if (password === user.password) {
        console.log("This is the password we found: ", user.password);
        return true;
      }
      else {
        console.log("We are here!!");
        return false;
      }
    }
    // passwordCompare();

    if (!passwordCompare()) {
      success = false;
      return res.status(401).json({ success, error: "Invalid password" });
    }

    const data = {
      user: {
        id: user.id
      }
    };
    const authtoken = jwt.sign(data, JWT_SECRET);

    // If the sign-in is successful, send the redirect URL in the response
    // const redirectUrl = "/Dashboard"; // Replace with the actual URL of the dashboard or desired page
    success = true;

    res.json({ success, authtoken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
app.post('/getuser', fetchuser, async (req, res) => {

  try {
    const userId = req.user.id;
    const user = await attempt.findById(userId)//.select("-password")
    res.send(user)

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


/// Multer storage configuration to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "C:/Users/Kaust/Desktop/ps1/React2/careerguru/uploads"); // Define the directory where files will be uploaded
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route to handle form submission
// Route to handle form submission
app.post('/updateprofile', upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'cv', maxCount: 1 }]), async (req, res) => {
  try {
    const formData = req.body;

    // Validate required fields
    if (!formData.name || !formData.email || !formData.dateOfBirth || !formData.phoneNumber || !formData.gender || !formData.hobbies || !req.files['profilePicture'] || !req.files['cv']) {
      return res.status(400).json({ error: 'Please provide all required fields!' });
    }

    // Process the hobbies field to store it as an array of strings
    if (formData.hobbies) {
      formData.hobbies = formData.hobbies.split(',').map((hobby) => hobby.trim());
    }

    // Include the file paths of the uploaded files in the form data
    formData.profilePicture = req.files['profilePicture'][0].path;
    formData.cv = req.files['cv'][0].path;

    // Create a new profile document based on the Profile schema and the form data
    const profile = new Profile(formData);

    // Save the profile data to the database
    await profile.save();

    // Send a response indicating success
    res.status(200).json({ message: 'Profile updated successfully!' });
  } catch (error) {
    console.error('Error:', error);
    // Send a response indicating failure
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
});


// Define the API endpoint to fetch user details by ID
app.get('/profile/:mailaddress', async (req, res) => {
  // app.get('/profile', fetchuser, async (req, res) => {
  try {
    const userMail = req.params.mailaddress
    // const userMail = req.params.mailaddress;
    const profile = await Profile.findOne({ email: userMail });
    // const reg_username=req.query.reg_username;
    // const profile = await Profile.findOne({ registered_username: reg_username });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});






app.listen(5001, () => {
  console.log("Server started");
});
