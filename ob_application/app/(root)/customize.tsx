// import React, { useEffect, useState } from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { LinearGradient } from "expo-linear-gradient";
// import { useLocalSearchParams } from "expo-router/build/hooks";
// import CustomButton from "@/components/CustomButton";
// import Footer from "@/components/Footer";
// import { useCartStore } from "@/store/store";

// const Customize = () => {
//   const { item } = useLocalSearchParams();
//   const parsedItem = item ? JSON.parse(item) : null;

//   const { addToCart } = useCartStore(); // Access the addToCart function from the cart store

//   // Customization state
//   const [selectedCakeType, setSelectedCakeType] = useState("");
//   const [selectedCakeSize, setSelectedCakeSize] = useState("");
//   const [selectedSugarLevel, setSelectedSugarLevel] = useState("");
//   const [selectedTopping, setSelectedTopping] = useState("");
//   const [dynamicPrice, setDynamicPrice] = useState(
//     parsedItem.discountedPrice || parsedItem.originalPrice
//   );

//   const sizePrices = {
//     Small: 0,
//     Medium: 200,
//     Large: 400,
//   };

//   const toppingPrices = {
//     Strawberries: 100,
//     "Chocolate Chips": 150,
//     Nuts: 120,
//     "Whipped Cream": 80,
//   };

//   // Update price dynamically
//   const updatePrice = () => {
//     let updatedPrice = parsedItem.discountedPrice || parsedItem.originalPrice;

//     // Add price based on size
//     if (sizePrices[selectedCakeSize]) {
//       updatedPrice += sizePrices[selectedCakeSize];
//     }

//     // Add price based on topping
//     if (toppingPrices[selectedTopping]) {
//       updatedPrice += toppingPrices[selectedTopping];
//     }

//     setDynamicPrice(updatedPrice);
//   };

//   // Call updatePrice whenever options are changed
//   useEffect(() => {
//     updatePrice();
//   }, [selectedCakeSize, selectedTopping]);

//   if (!parsedItem) {
//     return (
//       <SafeAreaView className="flex-1 bg-white justify-center items-center">
//         <Text className="text-lg font-bold text-gray-800">
//           No item data available.
//         </Text>
//       </SafeAreaView>
//     );
//   }

//   const handleAddToCart = () => {
//     const customizedCake = {
//       _id: parsedItem._id,
//       title: parsedItem.title,
//       basePrice: parsedItem.discountedPrice || parsedItem.originalPrice,
//       dynamicPrice: dynamicPrice,
//       cakeType: selectedCakeType,
//       cakeSize: selectedCakeSize,
//       sugarLevel: selectedSugarLevel,
//       topping: selectedTopping,
//       imageSource: parsedItem.imageSource,
//       cartTotalQuantity: 1,
//       price: dynamicPrice,
//       category: parsedItem.category || "Customized Cake",
//       weight: parsedItem.weight || "1kg",
//     };

//     // Add the customized cake to the cart
//     //console.log(customizedCake);
//     addToCart(customizedCake);
//   };

//   return (
//     <SafeAreaView className="flex-">
//       <LinearGradient
//         colors={["#FE8180", "#FFFFFF", "#FE8F8E"]}
//         className="flex-1"
//         start={{ x: 0, y: 0 }}
//         end={{ x: 0, y: 1 }}
//         locations={[0, 0.5, 1]}
//       >
//         <ScrollView>
//           <View>
//             <Image
//               source={parsedItem.imageSource}
//               className="w-full h-80"
//               resizeMode="cover"
//             />
//           </View>

//           <View className="p-5">
//             <Text className="text-2xl font-bold text-gray-800">
//               {parsedItem.title}
//             </Text>
//           </View>

//           {/* Customization Options */}
//           <View className="p-5">
//             <Text className="text-lg font-bold mb-2">Cake Type</Text>
//             <View className="border border-gray-300 rounded-md mb-5">
//               <Picker
//                 selectedValue={selectedCakeType}
//                 onValueChange={(itemValue) => setSelectedCakeType(itemValue)}
//               >
//                 <Picker.Item label="Select Cake Type" value="" />
//                 <Picker.Item label="Vanilla" value="Vanilla" />
//                 <Picker.Item label="Chocolate" value="Chocolate" />
//                 <Picker.Item label="Red Velvet" value="Red Velvet" />
//               </Picker>
//             </View>

//             <Text className="text-lg font-bold mb-2">Cake Size</Text>
//             <View className="border border-gray-300 rounded-md mb-5">
//               <Picker
//                 selectedValue={selectedCakeSize}
//                 onValueChange={(itemValue) => setSelectedCakeSize(itemValue)}
//               >
//                 <Picker.Item label="Select Cake Size" value="" />
//                 <Picker.Item label="Small" value="Small" />
//                 <Picker.Item label="Medium" value="Medium" />
//                 <Picker.Item label="Large" value="Large" />
//               </Picker>
//             </View>

//             <Text className="text-lg font-bold mb-2">Sugar Level</Text>
//             <View className="border border-gray-300 rounded-md mb-5">
//               <Picker
//                 selectedValue={selectedSugarLevel}
//                 onValueChange={(itemValue) => setSelectedSugarLevel(itemValue)}
//               >
//                 <Picker.Item label="Select Sugar Level" value="" />
//                 <Picker.Item label="No Sugar" value="No Sugar" />
//                 <Picker.Item label="Low" value="Low" />
//                 <Picker.Item label="Medium" value="Medium" />
//                 <Picker.Item label="High" value="High" />
//               </Picker>
//             </View>

//             <Text className="text-lg font-bold mb-2">Topping</Text>
//             <View className="border border-gray-300 rounded-md mb-5">
//               <Picker
//                 selectedValue={selectedTopping}
//                 onValueChange={(itemValue) => setSelectedTopping(itemValue)}
//               >
//                 <Picker.Item label="Select Topping" value="" />
//                 <Picker.Item label="Strawberries" value="Strawberries" />
//                 <Picker.Item label="Chocolate Chips" value="Chocolate Chips" />
//                 <Picker.Item label="Nuts" value="Nuts" />
//                 <Picker.Item label="Whipped Cream" value="Whipped Cream" />
//               </Picker>
//             </View>
//           </View>

//           <View className="p-5">
//             <CustomButton
//               title={`Add to cart - Rs. ${dynamicPrice}`}
//               onPress={handleAddToCart}
//               className="bg-primary-500 py-3 rounded-full"
//             />
//           </View>
//         </ScrollView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// };

// export default Customize;
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Image, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
//import ReactNativeModal from "react-native-modal";
import { useCartStore } from "@/store/store";
import { images } from "@/constants";

const Customize = () => {
  const { item } = useLocalSearchParams();
  const parsedItem = item ? JSON.parse(item) : null;
  const router = useRouter();
  const { addToCart } = useCartStore();

  // State for customization options
  const [selectedCakeType, setSelectedCakeType] = useState("");
  const [selectedCakeSize, setSelectedCakeSize] = useState("");
  const [selectedSugarLevel, setSelectedSugarLevel] = useState("");
  const [selectedTopping, setSelectedTopping] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("");
  const [dynamicPrice, setDynamicPrice] = useState(
    parsedItem?.discountedPrice || parsedItem?.originalPrice || 0
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const sizePrices = {
    Small: 0,
    Medium: 200,
    Large: 400,
  };

  const toppingPrices = {
    Strawberries: 100,
    "Chocolate Chips": 150,
    Nuts: 120,
    "Whipped Cream": 80,
  };

  const weightPrices = {
    "1": 0,
    "2": 100,
    "3": 200,
  };

  // Update price dynamically based on options
  const updatePrice = () => {
    let updatedPrice =
      parsedItem?.discountedPrice || parsedItem?.originalPrice || 0;

    if (sizePrices[selectedCakeSize]) {
      updatedPrice += sizePrices[selectedCakeSize];
    }

    if (toppingPrices[selectedTopping]) {
      updatedPrice += toppingPrices[selectedTopping];
    }

    if (weightPrices[selectedWeight]) {
      updatedPrice += weightPrices[selectedWeight];
    }

    setDynamicPrice(updatedPrice);
  };

  // Trigger price update on option changes
  useEffect(() => {
    updatePrice();
  }, [selectedCakeSize, selectedTopping, selectedWeight]);

  const handleAddToCart = () => {
    const customizedCake = {
      _id: parsedItem._id,
      title: parsedItem.title,
      basePrice: parsedItem?.discountedPrice || parsedItem?.originalPrice || 0,
      dynamicPrice: dynamicPrice,
      cakeType: selectedCakeType,
      cakeSize: selectedCakeSize,
      sugarLevel: selectedSugarLevel,
      topping: selectedTopping,
      imageSource: parsedItem.imageSource,
      cartTotalQuantity: 1,
      price: dynamicPrice,
      category: parsedItem.category || "Customized Cake",
      weight: selectedWeight,
    };

    // Add to cart and show confirmation modal
    addToCart(customizedCake);
    setShowSuccessModal(true);
  };

  if (!parsedItem) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-lg font-bold text-gray-800">
          No item data available.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LinearGradient
        colors={["#FE8180", "#FFFFFF", "#FE8F8E"]}
        className="flex-1"
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.5, 1]}
      >
        <ScrollView>
          <View>
            <Image
              source={parsedItem.imageSource}
              className="w-full h-80"
              resizeMode="cover"
            />
          </View>

          <View className="p-5">
            <Text className="text-2xl font-bold text-gray-800">
              {parsedItem.title}
            </Text>
          </View>

          {/* Customization Options */}
          <View className="p-5">
            <Text className="text-lg font-bold mb-2">Cake Type</Text>
            <View className="border border-gray-300 rounded-md mb-5">
              <Picker
                selectedValue={selectedCakeType}
                onValueChange={(itemValue) => setSelectedCakeType(itemValue)}
              >
                <Picker.Item label="Select Cake Type" value="" />
                <Picker.Item label="Vanilla" value="Vanilla" />
                <Picker.Item label="Chocolate" value="Chocolate" />
                <Picker.Item label="Red Velvet" value="Red Velvet" />
              </Picker>
            </View>

            <Text className="text-lg font-bold mb-2">Cake Size</Text>
            <View className="border border-gray-300 rounded-md mb-5">
              <Picker
                selectedValue={selectedCakeSize}
                onValueChange={(itemValue) => setSelectedCakeSize(itemValue)}
              >
                <Picker.Item label="Select Cake Size" value="" />
                <Picker.Item label="Small" value="Small" />
                <Picker.Item label="Medium" value="Medium" />
                <Picker.Item label="Large" value="Large" />
              </Picker>
            </View>

            <Text className="text-lg font-bold mb-2">Sugar Level</Text>
            <View className="border border-gray-300 rounded-md mb-5">
              <Picker
                selectedValue={selectedSugarLevel}
                onValueChange={(itemValue) => setSelectedSugarLevel(itemValue)}
              >
                <Picker.Item label="Select Sugar Level" value="" />
                <Picker.Item label="No Sugar" value="No Sugar" />
                <Picker.Item label="Low" value="Low" />
                <Picker.Item label="Medium" value="Medium" />
                <Picker.Item label="High" value="High" />
              </Picker>
            </View>

            <Text className="text-lg font-bold mb-2">Topping</Text>
            <View className="border border-gray-300 rounded-md mb-5">
              <Picker
                selectedValue={selectedTopping}
                onValueChange={(itemValue) => setSelectedTopping(itemValue)}
              >
                <Picker.Item label="Select Topping" value="" />
                <Picker.Item label="Strawberries" value="Strawberries" />
                <Picker.Item label="Chocolate Chips" value="Chocolate Chips" />
                <Picker.Item label="Nuts" value="Nuts" />
                <Picker.Item label="Whipped Cream" value="Whipped Cream" />
              </Picker>
            </View>

            <Text className="text-lg font-bold mb-2">Weight</Text>
            <View className="border border-gray-300 rounded-md mb-5">
              <Picker
                selectedValue={selectedWeight}
                onValueChange={(itemValue) => setSelectedWeight(itemValue)}
              >
                <Picker.Item
                  label="Select Weight"
                  value={parsedItem.weight ? parsedItem.weight : "1 Kg"}
                />
                <Picker.Item label="1 Kg" value="1" />
                <Picker.Item label="2 Kg" value="2" />
                <Picker.Item label="3 Kg" value="3" />
              </Picker>
            </View>
          </View>

          <View className="p-5">
            <CustomButton
              title={`Add to cart - Rs. ${dynamicPrice}`}
              onPress={handleAddToCart}
              className="bg-primary-500 py-3 rounded-full"
            />
          </View>
        </ScrollView>

        {/* Success Modal */}
        {/* <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-xl min-h-[300px]">
            <Image
              source={images.check} // Replace with your image
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-bold text-center">Added!</Text>
            <Text className="text-base text-gray-400 text-center mt-2">
              Your customized cake has been added to the cart.
            </Text>
            <CustomButton
              title="Continue Shopping"
              onPress={() => {
                setShowSuccessModal(false);
                router.push("/(root)/(tabs)/home"); // Navigate to home
              }}
              className="mt-5 bg-primary-500"
            />
            <CustomButton
              title="Go to cart"
              onPress={() => {
                setShowSuccessModal(false);
                router.push("/(root)/(tabs)/cart"); // Navigate to home
              }}
              className="mt-5 border border-primary-500 bg-primary-200"
              textVariant="primary"
            />
          </View>
        </ReactNativeModal> */}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Customize;
