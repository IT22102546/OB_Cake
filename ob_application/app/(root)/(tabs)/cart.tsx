import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import CartItemCard from "@/components/CartItemCard";
import { useCartStore } from "@/store/store"; // Import Zustand store
import { router } from "expo-router";

const CartScreen = () => {
  const { cartItems, updateQuantity, clearCart } = useCartStore();

  const calculateTotal = () =>
    cartItems.reduce(
      (total, item) => total + item.price * item.cartTotalQuantity,
      0
    );

  const customizeCost = 250;
  const subTotal = calculateTotal();
  const tax = subTotal * 0.1;
  const totalPayment = subTotal + customizeCost + tax;

  return (
    <LinearGradient
      colors={["#FE8180", "#FFFFFF", "#FE8F8E"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.5, 1]}
    >
      <SafeAreaView className="flex-1">
        <ScrollView
          className="mx-5 flex-1"
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text className="text-2xl text-primary-500 font-extrabold mt-10 mb-5">
              Cart
            </Text>

            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <CartItemCard
                  weight={item.weight}
                  key={index}
                  imageSource={item.imageSource}
                  title={item.title}
                  category={item.category}
                  price={item.price}
                  quantity={item.cartTotalQuantity}
                  _id={item._id}
                  item={item}
                  onIncrement={() => updateQuantity(item._id, "increment")} // Pass `_id`
                  onDecrement={() => updateQuantity(item._id, "decrement")} // Pass `_id`
                />
              ))
            ) : (
              <Text className="text-center text-lg text-gray-500 mt-10">
                Your cart is empty.
              </Text>
            )}

            {cartItems.length > 0 && (
              <View className="mt-5 bg-transparent">
                <View className="flex-row justify-between mb-2">
                  <Text className="font-JakartaBold">Subtotal</Text>
                  <Text className="font-JakartaBold">Rs. {subTotal}</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                  <Text className="font-JakartaBold">Customize Cost</Text>
                  <Text className="font-JakartaBold">Rs. {customizeCost}</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                  <Text className="font-JakartaBold">Tax (10%)</Text>
                  <Text className="font-JakartaBold">Rs. {tax.toFixed(0)}</Text>
                </View>
                <View className="border-t border-gray-300 my-2" />
                <View className="flex-row justify-between mb-5">
                  <Text className="font-bold">Total Payment</Text>
                  <Text className="font-bold">
                    Rs. {totalPayment.toFixed(0)}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
        <View className="p-4 bg-transparent">
          {cartItems.length > 0 && (
            <TouchableOpacity
              className="bg-[#800000] rounded-lg py-3 mb-2"
              onPress={clearCart} // Clear cart action
            >
              <Text className="text-white text-center font-bold">
                Clear Cart
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            className="bg-[#800000] rounded-lg py-3"
            onPress={() => router.push("/(root)/checkout")}
          >
            <Text className="text-white text-center font-bold">Checkout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CartScreen;
