import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CustomRadioButton = ({ options, selectedOption, onSelect, ...props }) => {
  return (
    <View className="font-JakartaBold">
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          className={`flex-row items-center mb-3 rounded-lg border  ${
            selectedOption === option.value
              ? "border-rose-500 bg-primary-200"
              : "border-gray-300"
          } p-3`}
          onPress={() => onSelect(option.value)}
        >
          {/* Radio Button Circle */}
          <View
            className={`h-5 w-5 rounded-full border-2 ${
              selectedOption === option.value
                ? "border-rose-500"
                : "border-gray-300"
            } flex items-center justify-center mr-3`}
          >
            {selectedOption === option.value && (
              <View className="h-2.5 w-2.5 rounded-full bg-rose-500" />
            )}
          </View>

          {/* Icon */}
          <View className="mr-3">
            <Image source={option.icon} className="w-8 h-8" />
          </View>

          {/* Label */}
          <Text
            className={`text-base ${
              selectedOption === option.value
                ? "text-primary-500 font-JakartaBold"
                : "text-gray-700"
            }`}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CustomRadioButton;
