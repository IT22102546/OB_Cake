import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import CakeCard from "@/components/CakeCard";
import { icons } from "@/constants";
import SearchBarInHeader from "@/components/SearchBarHeader";
import { useCartStore } from "@/store/store";

const SearchResults = () => {
  const cartTotalQuantity = useCartStore((state) => state.cartItems.length);
  const router = useRouter();
  const { query, category } = useLocalSearchParams(); // Access both query and category
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = process.env.EXPO_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchProductsByTitle = async () => {
      try {
        const url = `${API}/search/products?searchTerm=${query}`;
        console.log("Fetching by Title URL:", url); // Debugging the URL

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.results || []); // Use 'results' from the unified endpoint
      } catch (error) {
        console.error("Error fetching products by title:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProductsByCategory = async () => {
      try {
        const url = `${API}/search/products?category=${category}`;
        console.log("Fetching by Category URL:", url); // Debugging the URL

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.results || []); // Use 'results' from the unified endpoint
      } catch (error) {
        console.error("Error fetching products by category:", error);
      } finally {
        setLoading(false);
      }
    };

    // Decide which fetch function to call
    if (query) {
      fetchProductsByTitle();
    } else if (category) {
      fetchProductsByCategory();
    } else {
      setLoading(false); // No query or category
    }
  }, [query, category]); // Trigger when either query or category changes

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FE8180" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#FE8180", "#FFFFFF", "#FE8F8E"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.5, 1]}
    >
      <View className="p-3">
        {/* Search Bar */}
        <SearchBarInHeader />
      </View>

      <View className="flex-1">
        <Text className="text-xl text-center my-4 font-JakartaBold">
          {category
            ? `Results for category: ${category}`
            : `Search Results for "${query}"`}
        </Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <CakeCard
              _id={item._id}
              title={item.title}
              category={item.category}
              originalPrice={item.price}
              discountedPrice={item.discountedPrice || item.price}
              imageSource={{ uri: item.mainImage }}
              rating={item.rating}
              inStock={item.isAvailable}
              item={item}
            />
          )}
          contentContainerStyle={{
            paddingHorizontal: 8,
          }}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 16,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </LinearGradient>
  );
};

export default SearchResults;
