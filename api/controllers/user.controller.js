import  jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const test = (req, res) => {
  res.json({
    message: 'API is working'
  });
};

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
      user:"projecttest088@gmail.com",
      pass:"rhbe jknk ikvh hwzl"
  }
}) 

export const updateUser = async (req, res, next) => {
    try {
      // Validate password if provided
      if (req.body.password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{5,}$/;
        if (!passwordRegex.test(req.body.password)) {
          return next(errorHandler(400, 'Password should be at least 5 characters long and contain at least one uppercase letter, one digit, and one symbol (!@#$%^&*()_+).'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10); // Hash the password before saving
      }
  
      // Validate username if provided
      if (req.body.username && (req.body.username.length < 7 || req.body.username.length > 20)) {
        return next(errorHandler(400, 'Username must be between 7 and 20 characters.'));
      }
  
      // Validate mobile if provided
      if (req.body.mobile) {
        const mobileRegex = /^(071|076|077|075|078|070|074|072)\d{7}$/;
        if (!mobileRegex.test(req.body.mobile)) {
          return next(errorHandler(400, 'Invalid mobile number format.'));
        }
      }
  
      // Validate birthday if provided
      if (req.body.birthday) {
        const isValidDate = !isNaN(Date.parse(req.body.birthday)); // Check if the birthday is a valid date
        if (!isValidDate) {
          return next(errorHandler(400, 'Invalid date format for birthday.'));
        }
      }
  
      // Validate gender if provided
      if (req.body.gender && !['male', 'female', 'other','nf'].includes(req.body.gender)) {
        return next(errorHandler(400, 'Gender must be male, female, or other.'));
      }
  
      // Find the user by ID
      const user = await User.findById(req.params.id);
      if (!user) {
        return next(errorHandler(404, 'User not found.'));
      }
  
      // Update the user with all the fields from the request body
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username || user.username, // Only update if provided
            email: req.body.email || user.email, // Only update if provided
            password: req.body.password || user.password, // Only update if provided
            profilePicture: req.body.profilePicture || user.profilePicture, // Only update if provided
            adress: req.body.adress || user.adress, // Only update if provided
            mobile: req.body.mobile || user.mobile, // Only update if provided
            gender: req.body.gender || user.gender, // Only update if provided
            birthday: req.body.birthday || user.birthday, // Only update if provided
            lastName: req.body.lastName || user.lastName, // Only update if provided
            
          }
        },
        { new: true } // Return the updated user
      );
  
      if (!updatedUser) {
        return next(errorHandler(404, 'User update failed.'));
      }
  
      // Exclude sensitive information (like password) from the response
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest); // Send back updated user details
  
    } catch (error) {
      next(error); // Pass any errors to the error handler
    }
  };
  
export const deleteUser = async(req,res,next)=>{

  try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been Deleted...")
  } catch (error) {
      next(error)
  }
}
export const signout = (req, res, next) => {
  try {
    res.clearCookie('access_token').status(200).json('User has been signed out');
  } catch (error) {
    next(error);
  }
};


export const findUserByClerkId = async (req, res) => {
    const { clerkUserId } = req.params;  // Extract clerkUserId (email) from URL params
    console.log("Searching for user with Clerk ID (Email):", clerkUserId);
  
    try {
      // Log the query to ensure it's correct
      console.log("Querying MongoDB with:", { clerkUserId });
  
      // Find the user by Clerk ID (email stored as clerkUserId in MongoDB)
      const user = await User.findOne({ email: clerkUserId });
      console.log("Found user:", user);
  
      // If user not found, return a 404 error
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Return the MongoDB user document (including _id)
      console.log("User found:", user);
      res.json(user);  // Respond with the user data
    } catch (error) {
      // If error occurs, return a 500 error with the message
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  