import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomRadioButton from "@/components/RadioButton";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { icons } from "@/constants";
//import MapContainer from "@/components/MapContainer";

const Checkout = () => {
  const [purchaseOption, setPurchaseOption] = useState("gift");
  const [selectedLocation, setSelectedLocation] = useState(null);

  // const handleLocationSelect = (location) => {
  //   console.log("Selected Location:", location);
  //   setSelectedLocation(location);
  // };

  return (
    <LinearGradient
      colors={["#FE8180", "#FFFFFF", "#FE8F8E"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {/* Purchase Options */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-4 font-JakartaBold">
              Purchase Options
            </Text>
            <CustomRadioButton
              options={[
                { label: "Send as a Gift", value: "gift", icon: icons.asgift },
                { label: "Buy for Myself", value: "self", icon: icons.forSelf },
                { label: "Store Pickup", value: "pickup", icon: icons.pickUp },
              ]}
              selectedOption={purchaseOption}
              onSelect={setPurchaseOption}
            />
          </View>

          {/* Conditional Rendering Based on Purchase Option */}
          {purchaseOption === "gift" && (
            <>
              {/* Recipient’s Information */}
              <View className="mb-6">
                <Text className="text-lg font-semibold mb-4 font-JakartaBold">
                  Recipient’s Information
                </Text>
                <View className="space-y-4">
                  <InputField label="" placeholder="Recipient’s first name" />
                  <InputField label="" placeholder="Recipient’s last name" />
                  <InputField
                    label=""
                    placeholder="Recipient’s address line 1"
                  />
                  <InputField
                    label=""
                    placeholder="Recipient’s address line 2"
                  />
                  <InputField label="" placeholder="City" />
                  <InputField
                    label=""
                    placeholder="Recipient’s mobile number"
                    keyboardType="phone-pad"
                  />
                  <InputField
                    label=""
                    placeholder="Recipient’s home number"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              {/* Map and Delivery Information */}

              <View className="mb-6">
                <View>
                  {/* Map and Delivery Information */}
                  {/* <MapContainer onLocationSelect={handleLocationSelect} /> */}

                  {/* {selectedLocation && (
                    <View className="mt-4">
                      <Text className="text-base font-Jakarta ">
                        Latitude: {selectedLocation.latitude}
                      </Text>
                      <Text className="text-base font-Jakarta">
                        Longitude: {selectedLocation.longitude}
                      </Text>
                    </View>
                  )} */}
                </View>
              </View>

              {/* Personal Message */}
              <View className="mb-6">
                <Text className="text-lg font-semibold mb-4 font-JakartaBold">
                  Personal Message (Max 400 Characters)
                </Text>
                <InputField
                  label=""
                  placeholder="Ex: thinking of you on your Birthday"
                  multiline
                  maxLength={400}
                  inputStyle="h-32"
                />
              </View>

              {/* Sender Information */}
              <View className="mb-6">
                <Text className="text-lg font-semibold mb-4 font-JakartaBold">
                  Sender Information
                </Text>
                <View className="space-y-4">
                  <InputField label="" placeholder="Sender’s first name" />
                  <InputField label="" placeholder="Sender’s last name" />
                  <InputField
                    label=""
                    placeholder="Sender’s phone"
                    keyboardType="phone-pad"
                  />
                  <InputField
                    label=""
                    placeholder="Sender’s Email"
                    keyboardType="email-address"
                  />
                </View>
              </View>
            </>
          )}

          {purchaseOption === "self" && (
            <View className="mb-6">
              <Text className="text-lg font-semibold mb-4 font-JakartaBold">
                Recipient’s Information
              </Text>
              <View className="space-y-4">
                <InputField label="" placeholder="Recipient’s first name" />
                <InputField label="" placeholder="Recipient’s last name" />
                <InputField label="" placeholder="Recipient’s address line 1" />
                <InputField label="" placeholder="Recipient’s address line 2" />
                <InputField label="" placeholder="City" />
                <InputField
                  label=""
                  placeholder="Recipient’s mobile number"
                  keyboardType="phone-pad"
                />
                <InputField
                  label=""
                  placeholder="Recipient’s home number"
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          )}

          {purchaseOption === "pickup" && (
            <View className="mb-6 font-JakartaBold">
              <Text className="text-lg font-semibold mb-4 font-JakartaBold">
                Store Pickup Details
              </Text>
              <View className="space-y-4">
                <Text className="text-base font-JakartaSemiBold">
                  Store Address: 123 Main Street, Your City
                </Text>
                <Text className="text-base font-JakartaSemiBold">
                  Contact: +123 456 7890
                </Text>
                <Text className="text-base text-primary-500 font-JakartaSemiBold">
                  Same-day Pickup Available
                </Text>
              </View>
            </View>
          )}

          {/* Buttons */}
          <View className="flex-col gap-3">
            <CustomButton
              title="Back"
              className="bg-transparent border border-primary-500 p-3 rounded-full flex-1"
              onPress={() => router.push("/(root)/(tabs)/cart")}
            />
            <CustomButton
              title="Proceed"
              className="bg-primary-500 p-3 rounded-full flex-1"
              onPress={() => router.push("/(root)/payment")}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Checkout;
