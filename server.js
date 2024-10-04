const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

dotenv.config();
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/surveypay');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'] // You can adjust the values as needed
  }
});
const User = mongoose.model('User', userSchema);

app.post('/api/v1/users',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, phoneNumber, dateOfBirth, gender } = req.body;
    console.log(req.body);
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ firstName, lastName, email, password: hashedPassword, phoneNumber, dateOfBirth, gender });
      await user.save();

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.post('/api/v1/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 8080;

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
