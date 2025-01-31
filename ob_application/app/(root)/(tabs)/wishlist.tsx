/* eslint-disable prettier/prettier */
import WishListCard from "@/components/WishListCard";
import { images } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import the wishlist store
import { useWishlistStore } from "@/store/store";
import { useCartStore } from "@/store/store"; // For adding items to cart
import Footer from "@/components/Footer";

const Wishlist = () => {
  const { wishlistItems, addToWishlist, removeFromWishlist } =
    useWishlistStore();
  const { addToCart } = useCartStore(); // Access the cart store for adding items to cart

  return (
    <LinearGradient
      colors={["#FE8180", "#FFFFFF", "#FE8F8E"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }} // Start at the top
      end={{ x: 0, y: 1 }} // End at the bottom
      locations={[0, 0.5, 1]}
    >
      <SafeAreaView>
        <ScrollView
          className="mx-5"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {/* Wishlist */}
          <View>
            <Text className="text-2xl text-primary-500 font-extrabold bottom-3 mt-10">
              My Wishlist
            </Text>
            {wishlistItems.length > 0 ? (
              wishlistItems.map((item, index) => (
                <WishListCard
                  key={index}
                  _id={item._id}
                  addToCart={addToCart}
                  category={item.category}
                  discountedPrice={item.discountedPrice}
                  imageSource={item.imageSource}
                  inStock={item.inStock}
                  item={item}
                  originalPrice={item.originalPrice}
                  rating={item.rating}
                  removeFromWishlist={removeFromWishlist}
                  title={item.title}
                />
              ))
            ) : (
              <Text className="text-center text-lg text-gray-500 mt-10">
                Your wishlist is empty.
              </Text>
            )}
          </View>
          <Footer />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Wishlist;
