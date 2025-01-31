import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BestOfToday from "@/components/BestOfTodayCard";
import CakeCard from "@/components/CakeCard";
import SweetCard from "@/components/SweetCard";
import { SignedOut, useUser } from "@clerk/clerk-expo";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { images } from "@/constants";
import { CakeItem } from "@/types/type";

export default function Home() {
  const { user } = useUser();
  const [cakeItems, setCakeItems] = useState<CakeItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sweetItems, setSweetItems] = useState<CakeItem[]>([]);
  const [isLoadingSweets, setIsLoadingSweets] = useState(false);

  const API = process.env.EXPO_PUBLIC_API_KEY;

  // Fetch cakes from the backend
  const fetchCakes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/cakes/getcakes`);
      if (!response.ok) {
        throw new Error("Failed to fetch cakes");
      }
      const data = await response.json();
      setCakeItems(data.products);
    } catch (error) {
      console.error("Error fetching cakes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch sweets from the backend
  const fetchSweets = async () => {
    try {
      setIsLoadingSweets(true);
      const response = await fetch(`${API}/sweets/getsweets`);
      if (!response.ok) {
        throw new Error("Failed to fetch sweets");
      }
      const data = await response.json();
      setSweetItems(data.products);
    } catch (error) {
      console.error("Error fetching sweets:", error);
    } finally {
      setIsLoadingSweets(false);
    }
  };

  useEffect(() => {
    fetchCakes();
    fetchSweets();
  }, []);

  return (
    <LinearGradient
      colors={["#FE8180", "#FFFFFF", "#FE8F8E"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.5, 1]}
    >
      <SafeAreaView>
        <ScrollView
          className="mx-6"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {/* Best of today */}
          <View>
            <Text className="text-2xl text-primary-500 font-extrabold bottom-3 mt-10">
              Best of today
            </Text>
            <BestOfToday
              imageSource={images.cake1}
              title={"Strawberry Cheesecake"}
              category={"Wedding Cakes"}
              price={"1200"}
            />
          </View>

          {/* On sale products */}
          <View>
            <Text className="text-2xl text-primary-500 font-extrabold bottom-3 mt-3">
              On sale products
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-1"
            >
              {isLoading ? (
                <View className="flex-1 justify-center items-center">
                  <ActivityIndicator size="large" color="#FE8180" />
                  <Text className="text-base mt-2">Loading...</Text>
                </View>
              ) : (
                cakeItems.map((item) => {
                  const encodedUrl = decodeURIComponent(item.mainImage);
                  return (
                    <TouchableOpacity key={item._id}>
                      <CakeCard
                        _id={item._id}
                        title={item.title}
                        category={item.category}
                        originalPrice={item.price}
                        discountedPrice={item.price * 0.8}
                        imageSource={{ uri: encodedUrl }}
                        description={item.description}
                        rating={item.rating || 0}
                        inStock={item.isAvailable}
                        //weight={item.weight}
                        item={item}
                      />
                    </TouchableOpacity>
                  );
                })
              )}
            </ScrollView>
          </View>

          {/* Sweet products section */}
          <View>
            <Text className="text-2xl text-primary-500 font-extrabold bottom-3 mt-10">
              Sweet products
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-1"
            >
              {isLoadingSweets ? (
                <View className="flex-1 justify-center items-center">
                  <ActivityIndicator size="large" color="#FE8180" />
                  <Text className="text-base mt-2">Loading...</Text>
                </View>
              ) : (
                sweetItems.map((item) => {
                  const encodedUrl = decodeURIComponent(item.mainImage);
                  return (
                    <TouchableOpacity key={item._id}>
                      <SweetCard
                        _id={item._id}
                        title={item.title}
                        category={item.category}
                        originalPrice={item.price}
                        discountedPrice={item.price * 0.8}
                        imageSource={{ uri: encodedUrl }}
                        rating={item.rating || 0}
                        inStock={item.isAvailable}
                        item={item}
                      />
                    </TouchableOpacity>
                  );
                })
              )}
            </ScrollView>
          </View>

          {/* Time to taste */}
          <View className="mt-10 flex-1">
            <View className="text-center">
              <Text className="text-primary-600 text-3xl text-center font-JakartaBold">
                Time to taste, we make your wishes come true!!
              </Text>
              <Image
                source={images.signImage}
                style={{
                  width: 150,
                  height: 150,
                  marginTop: 20,
                  alignSelf: "center",
                }}
                resizeMode="contain"
              />
              <Text className="text-primary-700 font-Jakarta text-center font-semibold pb-5">
                Walking into 'OB Hand Makers Bakery' shop feels like stepping
                into a world of creativity and indulgence.
              </Text>
            </View>
          </View>
          <Footer />
        </ScrollView>

        <SignedOut>
          <Link href="/(auth)/sign-in">
            <Text>Sign in</Text>
          </Link>
          <Link href="/(auth)/sign-up">
            <Text>Sign up</Text>
          </Link>
        </SignedOut>
      </SafeAreaView>
    </LinearGradient>
  );
}
