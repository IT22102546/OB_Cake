/* eslint-disable prettier/prettier */
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const Order = () => {
  return (
    <View>
      <Text>Welcome,</Text>
      <Text>Email: </Text>
      <TouchableOpacity
        onPress={() => router.push("/(root)/api_test")}
        className="bg-primary-600 text-white p-4 rounded-lg"
      >
        <Text className="text-white">vieew api</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Order;
