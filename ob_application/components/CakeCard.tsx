/* eslint-disable prettier/prettier */
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useCartStore, useWishlistStore } from "@/store/store";
import { icons } from "@/constants";
import { CakeCardProps } from "@/types/type";
import { router } from "expo-router";
import { clsx } from "clsx";

const CakeCard = ({
  _id,
  title,
  category,
  originalPrice,
  discountedPrice,
  imageSource,
  description,
  rating,
  inStock,
  item,
  weight,
  className, // Accept className as a prop
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
    weight,
    price:
      discountedPrice && discountedPrice > 0 ? discountedPrice : originalPrice,
    cartTotalQuantity: 1,
  };
  const customizeObj = {
    _id,
    title,
    category,
    description,
    originalPrice,
    discountedPrice,
    imageSource,
    rating,
    inStock,
    weight,
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
      {/* Combine dynamic className with default styles */}
      <View
        className={clsx(
          "border-primary-500 rounded-[20px] p-4 border m-2 max-h-[450px]",
          className
        )}
      >
        <Image
          source={imageSource}
          className="w-full h-40 rounded-lg mb-1"
          resizeMode="cover"
        />
        <Text className="text-lg font-bold font-JakartaBold">{title}</Text>
        <Text className="text-sm text-gray-500">{category}</Text>
        {renderStars()}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(root)/customize",
              params: { item: JSON.stringify(customizeObj) },
            })
          }
          className="bg-pink-400 rounded-lg py-2 px-4 mt-1"
        >
          <Text className="text-white font-bold text-center">Customize</Text>
        </TouchableOpacity>
        <Text
          className={`font-bold mt-1 text-lg ${
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
          <View className="flex-row items-center gap-3 bottom-5">
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

export default CakeCard;
