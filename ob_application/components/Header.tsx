import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { icons, images } from "../constants/index";
import { useRouter } from "expo-router";
import InputField from "./InputField";
import { useCartStore } from "@/store/store";
import { useUserStore } from "@/store/store"; // Import your user store
import { useUser } from "@clerk/clerk-react"; // Clerk's useUser hook

const Header = () => {
  const { user } = useUser(); // Clerk's useUser hook to get the current user
  const { setCurrentUser } = useUserStore(); // Assuming you have a function in your store to update currentUser
  const currentUser = useUserStore((state) => state.currentUser); // Get current user from the store
  const [showCategories, setShowCategories] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [cakeCategories, setCakeCategories] = useState([]);
  const [sweetCategories, setSweetCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const cartTotalQuantity = useCartStore((state) => state.cartItems.length);

  const API = process.env.EXPO_PUBLIC_API_KEY;
  const router = useRouter();

  // Update user store after login
  useEffect(() => {
    if (user) {
      setCurrentUser(user); 
    }
  }, [user, setCurrentUser]);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/search/categories`);
      const data = await response.json();
      setCakeCategories(data.cakeCategories); // Set cake categories
      setSweetCategories(data.sweetCategories); // Set sweet categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showCategories) {
      fetchCategories();
    }
  }, [showCategories]);

  const handleSearch = () => {
    if (searchKeyword.trim() === "") {
      return;
    }
    // Search without category filter
    router.push({
      pathname: "/search",
      params: { query: searchKeyword, category: null },
    });
  };

  const handleCategorySearch = (category: string) => {
    router.push({
      pathname: "/search",
      params: { query: "", category },
    });
    setShowCategories(false);
  };

  return (
    <View>
      {/* Header Section */}
      <View className="flex-row justify-between items-center bg-[#FE8180] py-4 px-4">
        {/* Left Section: Logo */}
        <View className="flex-row items-center space-x-2">
          <Image source={images.signImage} className="w-10 h-10" />
          <Text className="text-2xl font-bold text-primary-600 ml-3">
            Logo here
          </Text>
        </View>

        {/* Right Section: Account and Cart */}
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity
            className="flex-col items-end"
            onPress={() => router.push("/profile")}
          >
            <Text className="text-sm font-medium text-gray-800">
              Hi, {currentUser ? currentUser.username || currentUser.firstName +" "+ currentUser.lastName: "Guest"} 
            </Text>
          </TouchableOpacity>
          {/* Show profile picture if user is logged in */}
          {currentUser && currentUser.profilePicture || currentUser && currentUser.imageUrl ? (
            <Image
              source={{ uri: currentUser.profilePicture || currentUser.imageUrl }}
              className="w-8 h-8 rounded-full ml-2"
            />
          ) : (
            <Image source={icons.person} className="w-8 h-8" />
          )}
          <View className="relative">
            <TouchableOpacity onPress={() => router.push("/cart")}>
              <Image source={icons.cart} className="w-8 h-8" />
            </TouchableOpacity>
            {cartTotalQuantity > 0 && (
              <View className="absolute -top-2 -right-2 bg-brown-700 rounded-full w-5 h-5 items-center justify-center">
                <Text className="text-xs text-white bg-primary-600 rounded-full px-1 font-bold">
                  {cartTotalQuantity}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Search Bar Section */}
      <View className="w-full h-[50px] mx-auto bg-[#FE8180]">
        <InputField
          label=""
          placeholder="Search"
          icon={icons.search}
          containerStyle="rounded-full bg-transparent border border-primary-500 w-[80%] mx-auto"
          value={searchKeyword}
          onChangeText={setSearchKeyword}
          onSubmitEditing={handleSearch}
        />
      </View>

      {/* Categories Dropdown */}
      <View className="flex-row items-center gap-3 px-4 bg-[#fa6666] relative">
        <TouchableOpacity
          onPress={() => setShowCategories(!showCategories)}
          className="bg-transparent p-2"
        >
          <Image source={icons.bar} className="w-8 h-8" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800 font-JakartaBold">
          Categories
        </Text>

        {/* Dropdown */}
        {showCategories && (
          <View className="absolute top-12 left-5 w-[90%] bg-[#fa6666] shadow-lg rounded-md z-20">
            {isLoading ? (
              <Text className="text-center text-white">Loading...</Text>
            ) : (
              <>
                {cakeCategories.length > 0 && (
                  <View>
                    <Text className="p-2 text-white font-bold">Cake Categories</Text>
                    {cakeCategories.map((category, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleCategorySearch(category)}
                        className="py-2 px-4 bg-[#FE8180] hover:bg-[#fa6666]"
                      >
                        <Text className="text-white text-lg">{category}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                {sweetCategories.length > 0 && (
                  <View>
                    <Text className="p-2 text-white font-bold">Sweet Categories</Text>
                    {sweetCategories.map((category, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleCategorySearch(category)}
                        className="py-2 px-4 bg-[#FE8180] hover:bg-[#fa6666]"
                      >
                        <Text className="text-white text-lg">{category}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default Header;
