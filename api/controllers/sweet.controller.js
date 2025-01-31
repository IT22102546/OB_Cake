import { errorHandler } from "../utils/error.js";
import User from '../models/user.model.js';
import Sweet from "../models/sweet.model.js";


export const getSweets  = async (req, res, next) => {
  try {
    const { slug, searchTerm, page = 1, limit = 9, category, priceRange } = req.query;
    const queryOptions = {};

    if (slug) {
      queryOptions.slug = slug;
    }

    if (searchTerm) {
      queryOptions.title = { $regex: searchTerm, $options: 'i' };
    }

    if (category) {
      queryOptions.category = category;
    }

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      queryOptions.price = { $gte: minPrice, $lte: maxPrice };
    }

    const totalProducts = await Sweet.countDocuments(queryOptions);
    const products = await Sweet.find(queryOptions)
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .populate('userId', 'username') 
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    next(error);
  }
};





export const getSweetsByCategory = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 9 } = req.query;

    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    const queryOptions = { category };

    const totalProducts = await Sweet.countDocuments(queryOptions);
    const products = await Sweet.find(queryOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    next(error);
  }
};

