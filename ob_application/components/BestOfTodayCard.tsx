/* eslint-disable prettier/prettier */
import { BestOfTodayButtonProps } from "@/types/type";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const BestOfToday = ({
  onPress,
  imageSource,
  title,
  category,
  price,
  ...props
}: BestOfTodayButtonProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View className="">
      <View className="bg-transparent border border-gray-400 rounded-[30px] p-4 flex-row items-center mb-4">
        <Image
          source={imageSource}
          className="w-24 h-24 rounded-lg mr-4"
          resizeMode="contain"
        />
        <View className="flex-1">
          <Text className="text-lg font-bold font-JakartaBold">{title}</Text>
          <Text className="text-primary-700 text-sm">{category}</Text>
          <Text className="text-base">Rs. {price}</Text>
        </View>
        <View className="flex-row items-center">
          <TouchableOpacity
            className="bg-gray-200 rounded-full w-8 h-8 justify-center items-center"
            onPress={handleDecrement}
            disabled={quantity <= 1}
          >
            <Text className="text-xl text-gray-700">-</Text>
          </TouchableOpacity>
          <Text className="mx-2 text-base">{quantity}</Text>
          <TouchableOpacity
            className="bg-gray-200 rounded-full w-8 h-8 justify-center items-center"
            onPress={handleIncrement}
          >
            <Text className="text-xl text-gray-700">+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BestOfToday;

// const ParentComponent = () => {
//     const cakeImage = require('./assets/strawberry_cheesecake.jpg')
//     return (
//         <View style={{flex: 1, backgroundColor: '#ffe6e6', padding: 16}}>
//             <CakeCard
//               imageSource={cakeImage}
//               title="Strawberry cheese cake"
//               category="Birthday Cakes"
//               price="3200"
//             />
//         </View>
//     )
// }

// export default ParentComponent;
