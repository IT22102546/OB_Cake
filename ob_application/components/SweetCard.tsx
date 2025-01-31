/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useCartStore, useWishlistStore } from "@/store/store";
import { icons } from "@/constants";
import { CakeCardProps } from "@/types/type";
import { router } from "expo-router";

const SweetCard = ({
  _id,
  title,
  category,
  originalPrice,
  discountedPrice,
  imageSource,
  rating,
  inStock,
  item,
  ...props
}: CakeCardProps) => {
  const { addToWishlist, removeFromWishlist, wishlistItems } =
    useWishlistStore();
  const { addToCart } = useCartStore();

  const cartObj = {
    _id,
    title,
    imageSource,
    category,
    price: originalPrice,
    cartTotalQuantity: 1,
  };

  const customizeObj = {
    _id,
    title,
    category,
    originalPrice,
    discountedPrice,
    imageSource,
    rating,
    inStock,
  };

  const isFavorite = wishlistItems.some(
    (wishlistItem) => wishlistItem._id === _id
  );

  const toggleFavorite = () => {
    const item = {
      _id,
      title,
      category,
      originalPrice,
      discountedPrice,
      imageSource,
      rating,
      inStock,
    };
    if (isFavorite) {
      removeFromWishlist(item);
    } else {
      addToWishlist(item);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(
          <Text key={i} className="text-primary-500 text-xl">
            ★
          </Text>
        );
      } else if (i < rating) {
        stars.push(
          <Text key={i} className="text-primary-500 text-xl">
            ☆
          </Text>
        );
      } else {
        stars.push(
          <Text key={i} className="text-gray-400 text-xl">
            ★
          </Text>
        );
      }
    }
    return <View className="flex-row">{stars}</View>;
  };

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/single_item",
          params: { item: JSON.stringify(item) },
        })
      }
      className="flex-1"
    >
      <View className="border-primary-500 rounded-[20px] p-4 border m-2 max-h-[450px]">
        <Image
          source={imageSource}
          className="w-full h-40 rounded-lg mb-3"
          resizeMode="cover"
        />
        <Text
          className="text-lg font-bold font-JakartaBold mb-1"
          numberOfLines={1} // Limit title to one line
          ellipsizeMode="tail" // Add ellipsis if text overflows
        >
          {title}
        </Text>
        <Text
          className="text-sm text-gray-500 mb-2"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {category}
        </Text>
        {renderStars()}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(root)/customize",
              params: { item: JSON.stringify(customizeObj) },
            })
          }
          className="bg-pink-400 rounded-lg py-2 px-4 mt-2"
        >
          <Text className="text-white font-bold text-center">Customize</Text>
        </TouchableOpacity>
        <Text
          className={`font-bold mt-2 text-lg ${
            inStock ? "text-green-500" : "text-red-500"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </Text>
        <View className="flex-row items-center justify-between mt-3">
          <View>
            <Text className="line-through text-gray-500">
              Rs. {originalPrice}
            </Text>
            <Text className="text-2xl text-primary-600 font-bold">
              Rs. {discountedPrice}
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={toggleFavorite}>
              <Image
                source={isFavorite ? icons.heartFill : icons.heart}
                className="w-5 h-5"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => addToCart(cartObj)}
              disabled={!inStock} // Disable Add to Cart if out of stock
            >
              <Image source={icons.cart} className="w-5 h-5" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SweetCard;
