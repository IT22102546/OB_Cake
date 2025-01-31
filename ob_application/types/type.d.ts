/* eslint-disable prettier/prettier */
import {
  ImageSourcePropType,
  TextInputProps,
  TouchableOpacityProps,
} from "react-native";

declare interface MarkerData {
  latitude: number;
  longitude: number;
  id: number;
  title: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
  first_name: string;
  last_name: string;
  time?: number;
  price?: string;
}

declare interface MapProps {
  destinationLatitude?: number;
  destinationLongitude?: number;
  onDriverTimesCalculated?: (driversWithTimes: MarkerData[]) => void;
  selectedDriver?: number | null;
  onMapReady?: () => void;
}

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface BestOfTodayButtonProps extends TouchableOpacityProps {
  title: string;
  category: string;
  price: string;
  imageSource: string;
  className?: string;
}

declare interface WishlistProps extends TouchableOpacityProps {
  _id: number; // Unique identifier for the wishlist item
  title: string; // Title of the wishlist item
  category: string; // Category of the wishlist item
  originalPrice: number; // Original price of the wishlist item
  discountedPrice: number; // Discounted price of the wishlist item
  imageSource: ImageSourcePropType; // Image source for the wishlist item
  rating: number; // Rating of the wishlist item (0-5, with decimals)
  inStock: boolean; // Stock availability
  item: CartItem; // Use the CartItem type for the item
  addToCart: (item: CartItem) => void; // Function to add the item to the cart
  removeFromWishlist: (item: CartItem) => void; // Function to remove the item from the wishlist
  className?: string; // Optional className for styling
}

declare interface CartCardProps extends TouchableOpacityProps {
  _id: number; // Unique identifier for the cart item
  title: string; // Title of the cart item
  price: number; // Price of the cart item
  quantity: number; // Quantity of the cart item in the cart
  weight: string;
  item: any;
  category: string; // Category of the cart item
  imageSource: ImageSourcePropType; // Image source of the cart item
  onIncrement: (id: number) => void; // Function to increment the quantity
  onDecrement: (id: number) => void; // Function to decrement the quantity
  className?: string; // Optional className for styling
}

declare interface CakeCardProps extends TouchableOpacityProps {
  _id: number; // Unique identifier for the item
  title: string; // Title of the cake
  category: string; // Category of the cake
  description: string;
  originalPrice: number; // Original price of the cake
  discountedPrice: number; // Discounted price of the cake
  imageSource: ImageSourcePropType; // Image source of the cake
  rating: number; // Rating of the cake (0-5, with decimals)
  weight: string;
  inStock: boolean; // Stock availability
  item: { [key: string]: any }; // Complete item object (use CartItem type if defined)
  className?: string; // Optional className for styling
}

declare interface GoogleInputProps {
  icon?: string;
  initialLocation?: string;
  containerStyle?: string;
  textInputBackgroundColor?: string;
  handlePress: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

declare interface PaymentProps {
  fullName: string;
  email: string;
  amount: string;
  driverId: number;
  rideTime: number;
}

declare interface LocationStore {
  userLatitude: number | null;
  userLongitude: number | null;
  userAddress: string | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
  destinationAddress: string | null;
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

interface CartItem {
  _id: number;
  title: string;
  imageSource: ImageSourcePropType;
  price: number;
  category: string;
  weight: string;
  cartTotalQuantity: number;
}

interface CartState {
  cartItems: CartItem[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
  initializeCart: () => Promise<void>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  decreaseCart: (item: CartItem) => void;
  clearCart: () => void;
  getCartTotal: () => void;
  updateQuantity: (_id: number, action: "increment" | "decrement") => void;
}

declare interface WishlistItem {
  _id: number;
  title: string;
  category: string;
  originalPrice: number;
  discountedPrice: number;
  imageSource: any; // Adjust type to match your image source
  rating: number;
  inStock: boolean;
}

interface CakeItem {
  _id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  mainImage: string;
  rating?: number;
  isAvailable: boolean;
}

