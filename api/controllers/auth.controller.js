import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";



export const signup = async (req, res, next) => {
  const { username, email, password, mobile, adress} = req.body;

  console.log("username : ",username);
  console.log("email : ",email);
  console.log("pass : ",password);
  console.log("mobile : ",mobile);
  console.log("address : ",adress);

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^(071|076|077|075|078|070|074|072)\d{7}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{5,}$/;

  if (!username || !email || !password || !mobile || !adress ||
      username === "" || email === "" || password === "" || mobile === "" || adress === "" ) {
      return next(errorHandler(400, 'All fields are required'));
  } else if (!emailRegex.test(email)) {
      return next(errorHandler(400, 'Invalid email format'));
  } else if (!mobileRegex.test(mobile)) {
      return next(errorHandler(400, 'Invalid mobile number format'));
  } else if (!passwordRegex.test(password)) {
      return next(errorHandler(400, 'Password should be at least 5 characters long and contain at least one uppercase letter, one digit, and one symbol (!@#$%^&*()_+).'));
  }else if (username.length < 7 || req.body.username.length > 20) {
    return next(errorHandler(400, 'Username must be between 7 and 20 characters'));
}

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword, adress, mobile });

  console.log("newUser",newUser);

  try {
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
  } catch (err) {
      next(err);
  }
};



export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(400, "Invalid Credentials!"));

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000);

    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json({ user: rest, token }); // Send user details and token to frontend
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const { email, name, photo } = req.body;

    if (!email || !name) {
      return res.status(400).json({ message: "Missing required fields: name or email" });
    }

    let user = await User.findOne({ email });

    if (user) {
      // Generate JWT token for existing user
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const expiryDate = new Date(Date.now() + 3600000);
      return res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json({ user: { username: user.username, email: user.email, profilePicture: user.profilePicture }, token });
    } else {
      // Generate random password & hash it
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryptjs.hash(generatedPassword, 10);

      const newUser = new User({
        username: name,
        email,
        password: hashedPassword,
        profilePicture: photo,
      });

      await newUser.save();

      // Generate JWT token for the new user
      const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const expiryDate = new Date(Date.now() + 3600000);
      return res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json({ user: { username: newUser.username, email: newUser.email, profilePicture: newUser.profilePicture }, token });
    }
  } catch (error) {
    next(error);
  }
};
