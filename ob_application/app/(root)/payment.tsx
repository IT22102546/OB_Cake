import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View, ScrollView } from "react-native";
import CustomRadioButton from "@/components/RadioButton"; // Assuming you have a reusable RadioButton component
import CustomButton from "@/components/CustomButton"; // Assuming you have a reusable Button component
import { icons } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCartStore } from "@/store/store";
import { router } from "expo-router";

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("visa");
  // Uncomment this when implementing the installment plan
  // const [selectedInstallmentPlan, setSelectedInstallmentPlan] = useState("koko");

  const { cartTotalAmount, getCartTotal, cartItems } = useCartStore(); // Access Zustand store

  const deliveryCharge = 250;
  const customizedCharge = 250;
  const taxRate = 0.1; // 10% tax
  const tax = cartTotalAmount * taxRate;
  const totalAmount = cartTotalAmount + deliveryCharge + customizedCharge + tax;

  // Calculate the total cart amount whenever the cart changes
  useEffect(() => {
    getCartTotal();
  }, [cartItems, getCartTotal]);

  return (
    <LinearGradient
      colors={["#FE8180", "#FFFFFF", "#FE8F8E"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {/* Payment Summary */}
          <View className="mb-6">
            <Text className="text-xl font-semibold mb-4 font-JakartaBold">
              Payment Method
            </Text>
            <View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-base font-JakartaSemiBold">
                  Total Item
                </Text>
                <Text className="text-base font-JakartaSemiBold">
                  Rs. {cartTotalAmount.toFixed(2)}
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-base font-JakartaSemiBold">
                  Customized Charge
                </Text>
                <Text className="text-base font-JakartaSemiBold">
                  Rs. {customizedCharge.toFixed(2)}
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-base font-JakartaSemiBold">
                  Delivery Charges
                </Text>
                <Text className="text-base font-JakartaSemiBold">
                  Rs. {deliveryCharge.toFixed(2)}
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-base font-JakartaSemiBold">Tax: 10%</Text>
                <Text className="text-base font-JakartaSemiBold">
                  Rs. {tax.toFixed(2)}
                </Text>
              </View>
              <View className="flex-row justify-between mt-4">
                <Text className="text-xl font-semibold font-JakartaExtraBold">
                  Rs. {totalAmount.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>

          {/* Select Payment Method */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-4">
              Select Payment Method
            </Text>
            <CustomRadioButton
              options={[
                { label: "Visa", value: "visa", icon: icons.visa },
                {
                  label: "Mastercard",
                  value: "mastercard",
                  icon: icons.master,
                },
              ]}
              selectedOption={selectedPaymentMethod}
              onSelect={setSelectedPaymentMethod}
            />
          </View>

          {/* Select Installment Plan */}
          {/* Uncomment when implementing KoKo installment plan */}
          {/* <View className="mb-6">
            <Text className="text-lg font-semibold mb-4">
              Select Installment Plan
            </Text>
            <CustomRadioButton
              options={[{ label: "KoKo", value: "koko", icon: icons.koko }]}
              selectedOption={selectedInstallmentPlan}
              onSelect={setSelectedInstallmentPlan}
            />
            <View className="flex-row justify-between mt-4">
              <Text className="text-base">Plan</Text>
              <Text className="text-base">3 Months Plan</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-base">Handling Fee</Text>
              <Text className="text-base">0%</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-base">Installment</Text>
              <Text className="text-base">Rs. </Text>
            </View>
          </View> */}

          {/* Buttons */}
          <View className="flex-col gap-3">
            <CustomButton
              onPress={() => router.push("/(root)/checkout")}
              title="Edit Delivery"
              className="bg-transparent border border-primary-500 p-3 rounded-full"
            />
            <CustomButton
              title="Proceed to Pay"
              className="bg-primary-500 p-3 rounded-full"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Payment;
