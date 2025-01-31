import Cake from "../models/cake.model.js";
import { errorHandler } from "../utils/error.js";

export const getCakes = async (req, res, next) => {
  try {
    const {
      slug,
      searchTerm,
      page = 1,
      limit = 9,
      category,
      priceRange,
    } = req.query;
    const queryOptions = {};
    //console.log("Search Term:", searchTerm);

    if (slug) {
      queryOptions.slug = slug;
    }

    if (searchTerm) {
      queryOptions.title = { $regex: searchTerm, $options: "i" };
    }

    if (category) {
      queryOptions.category = category;
    }

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split("-").map(Number);
      queryOptions.price = { $gte: minPrice, $lte: maxPrice };
    }

    const totalProducts = await Cake.countDocuments(queryOptions);
    const products = await Cake.find(queryOptions)
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .populate("userId", "username")
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

export const getCakesByCategory = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 9 } = req.query;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const queryOptions = { category };

    const totalProducts = await Cake.countDocuments(queryOptions);
    const products = await Cake.find(queryOptions)
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

export const getCakesByShop = async (req, res) => {
  const { userId } = req.params;
  try {
    const cakes = await Cake.find({ userId });
    res.status(200).json({ success: true, cakes });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Failed to fetch cakes" });
  }
};
