import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants"; // Replace with your icons file
import { useRouter } from "expo-router";
import InputField from "./InputField";

const SearchBarInHeader = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchKeyword.trim() !== "") {
      router.push({
        pathname: "/search",
        params: { query: searchKeyword },
      });
    }
  };

  return (
    <>
      <View className="w-full h-[50px] mx-autos">
        <InputField
          label=""
          placeholder="Search"
          icon={icons.search}
          containerStyle="rounded-full bg-transparent border border-primary-500 w-[80%] mx-auto"
          value={searchKeyword}
          onChangeText={setSearchKeyword}
          onSubmitEditing={handleSearch}
        />
        {/* <TouchableOpacity onPress={handleSearch}>
          <Image source={icons.search} className="w-5 h-5 tint-primary" />
        </TouchableOpacity> */}
      </View>
    </>
  );
};

export default SearchBarInHeader;
