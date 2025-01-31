import Toast from "react-native-toast-message";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItem, CartState } from "@/types/type";
import { useAuth } from "@clerk/clerk-expo";

// Helper function to handle AsyncStorage
interface SaveCartToStorage {
  (cartItems: CartItem[]): Promise<void>;
}

const saveCartToStorage = async (cartItems: CartItem[]): Promise<void> => {
  try {
    //console.log("Saving cart to storage:", cartItems);
    await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error saving cart to storage:", error);
  }
};

const loadCartFromStorage = async (): Promise<CartItem[]> => {
  try {
    const storedCart = await AsyncStorage.getItem("cartItems");
    //console.log("Loaded cart from storage:", storedCart);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Error loading cart from storage:", error);
    return [];
  }
};

// Zustand store
export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,

  // Initialize the cart from AsyncStorage
  initializeCart: async () => {
    const storedCartItems: CartItem[] = await loadCartFromStorage();
    set({ cartItems: storedCartItems });
    get().getCartTotal(); // Recalculate totals after initialization
  },

  // Add an item to the cart
  addToCart: (item: CartItem) => {
    set((state) => {
      const existingItemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      let updatedCartItems = [...state.cartItems];

      if (existingItemIndex >= 0) {
        updatedCartItems[existingItemIndex].cartTotalQuantity += 1;
        Toast.show({
          type: "info",
          text1: `Increased ${updatedCartItems[existingItemIndex].title} quantity`,
        });
      } else {
        const tempProduct = { ...item, cartTotalQuantity: 1 };
        updatedCartItems.push(tempProduct);
        Toast.show({
          type: "success",
          text1: `${item.title} added to cart`,
        });
      }

      saveCartToStorage(updatedCartItems);
      return { cartItems: updatedCartItems };
    });
    get().getCartTotal(); // Update totals
  },

  // Remove an item from the cart
  removeFromCart: (item: CartItem) => {
    set((state) => {
      const updatedCartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== item._id
      );
      Toast.show({
        type: "error",
        text1: `${item.title} removed from cart`,
      });
      saveCartToStorage(updatedCartItems);
      return { cartItems: updatedCartItems };
    });
    get().getCartTotal(); // Update totals
  },

  // Decrease the quantity of an item in the cart
  decreaseCart: (item: CartItem) => {
    set((state) => {
      const existingItemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItemIndex >= 0) {
        let updatedCartItems = [...state.cartItems];
        if (updatedCartItems[existingItemIndex].cartTotalQuantity > 1) {
          updatedCartItems[existingItemIndex].cartTotalQuantity -= 1;
          Toast.show({
            type: "info",
            text1: `Decreased ${item.title} quantity`,
          });
        } else {
          updatedCartItems = updatedCartItems.filter(
            (cartItem) => cartItem._id !== item._id
          );
          Toast.show({
            type: "error",
            text1: `${item.title} removed from cart`,
          });
        }
        saveCartToStorage(updatedCartItems);
        return { cartItems: updatedCartItems };
      }
      return state;
    });
    get().getCartTotal(); // Update totals
  },

  // Clear the cart
  clearCart: () => {
    set(() => {
      Toast.show({
        type: "error",
        text1: "Cart is cleared",
      });
      saveCartToStorage([]);
      return { cartItems: [] };
    });
    get().getCartTotal(); // Update totals
  },

  // Calculate the total amount and quantity in the cart
  getCartTotal: () => {
    const state = get();
    const { total, quantity } = state.cartItems.reduce(
      (cartTotal, cartItem) => {
        const { price, cartTotalQuantity } = cartItem;
        const itemTotal = price * cartTotalQuantity;

        cartTotal.total += itemTotal;
        cartTotal.quantity += cartTotalQuantity;

        return cartTotal;
      },
      { total: 0, quantity: 0 }
    );

    set(() => ({
      cartTotalAmount: total,
      cartTotalQuantity: quantity,
    }));
  },

  // update quantity directly in the store
  updateQuantity: (_id: number, action: "increment" | "decrement") => {
    const state = get();
    const item = state.cartItems.find((item) => item._id === _id);
    if (item) {
      const newQuantity =
        action === "increment"
          ? item.cartTotalQuantity + 1
          : item.cartTotalQuantity - 1;

      if (newQuantity > 0) {
        set((state) => {
          const updatedCartItems = state.cartItems.map((cartItem) =>
            cartItem._id === _id
              ? { ...cartItem, cartTotalQuantity: newQuantity }
              : cartItem
          );

          saveCartToStorage(updatedCartItems);
          return { cartItems: updatedCartItems };
        });
        Toast.show({
          type: "info",
          text1: `Updated ${item.title} quantity to ${newQuantity}`,
        });
      } else {
        get().removeFromCart(item); // Use removeFromCart if quantity reaches 0
      }
    }
  },
}));

///------------------------------------Wishlist store -----------------------------------------------------------------------------
// Helper function to handle AsyncStorage
interface WishlistItem {
  _id: string;
  title: string;
}

interface WishlistState {
  wishlistItems: WishlistItem[];
  initializeWishlist: () => Promise<void>;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (item: WishlistItem) => void;
  clearWishlist: () => void;
}

// Helper functions for AsyncStorage
const saveWishlistToStorage = async (
  wishlistItems: WishlistItem[]
): Promise<void> => {
  try {
    //console.log("Saving wishlist to storage:", wishlistItems);
    await AsyncStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  } catch (error) {
    console.error("Error saving wishlist to storage:", error);
  }
};

const loadWishlistFromStorage = async (): Promise<WishlistItem[]> => {
  try {
    const storedWishlist = await AsyncStorage.getItem("wishlistItems");
    //console.log("Loaded wishlist from storage:", storedWishlist);
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  } catch (error) {
    console.error("Error loading wishlist from storage:", error);
    return [];
  }
};

// Zustand store
export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlistItems: [],

  // Initialize the wishlist from AsyncStorage
  initializeWishlist: async () => {
    const storedWishlistItems: WishlistItem[] = await loadWishlistFromStorage();
    set({ wishlistItems: storedWishlistItems });
  },

  // Add an item to the wishlist
  addToWishlist: (item: WishlistItem) => {
    set((state) => {
      const existingItem = state.wishlistItems.find(
        (wishlistItem) => wishlistItem._id === item._id
      );

      if (!existingItem) {
        const updatedWishlistItems = [...state.wishlistItems, item];
        saveWishlistToStorage(updatedWishlistItems);
        Toast.show({
          type: "success",
          text1: `${item.title} added to your wishlist`,
        });
        return { wishlistItems: updatedWishlistItems };
      } else {
        Toast.show({
          type: "info",
          text1: `${item.title} is already in your wishlist`,
        });
        return state;
      }
    });
  },

  // Remove an item from the wishlist
  removeFromWishlist: (item: WishlistItem) => {
    set((state) => {
      const updatedWishlistItems = state.wishlistItems.filter(
        (wishlistItem) => wishlistItem._id !== item._id
      );
      saveWishlistToStorage(updatedWishlistItems);
      Toast.show({
        type: "error",
        text1: `${item.title} removed from your wishlist`,
      });
      return { wishlistItems: updatedWishlistItems };
    });
  },

  // Clear the entire wishlist
  clearWishlist: () => {
    set(() => {
      saveWishlistToStorage([]);
      Toast.show({
        type: "error",
        text1: "Wishlist cleared",
      });
      return { wishlistItems: [] };
    });
  },
}));

///----------------------------------------user store---------------------------------------------------------------------------------------
export const useUserStore = create((set, get) => ({
  currentUser: null,
  loading: false,
  error: false,

  setCurrentUser: (user) => {
    AsyncStorage.setItem("currentUser", JSON.stringify(user));
    set(() => ({ currentUser: user, loading: false, error: false }));
  },
  
  signInStart: () => set(() => ({ loading: true, error: false })),
  signInSuccess: (user) => {
    AsyncStorage.setItem("currentUser", JSON.stringify(user));
    set(() => ({ currentUser: user, loading: false, error: false }));
  },
  signInFailure: (error) => set(() => ({ loading: false, error })),

  loadUserFromStorage: async () => {
    try {
      const storedUser = await AsyncStorage.getItem("currentUser");
      if (storedUser) {
        set(() => ({ currentUser: JSON.parse(storedUser) }));
      }
    } catch (error) {
      console.error("Error loading user from storage:", error);
    }
  },

  updateUserStart: () => set(() => ({ loading: true, error: false })),
  updateUserSuccess: (user) => {
    AsyncStorage.setItem("currentUser", JSON.stringify(user));
    set(() => ({ currentUser: user, loading: false, error: false }));
  },
  updateUserFailure: (error) => set(() => ({ loading: false, error })),

  deleteUserStart: () => set(() => ({ loading: true, error: false })),
  deleteUserSuccess: async () => {
    try {
      await AsyncStorage.removeItem("currentUser");
      set(() => ({ currentUser: null, loading: false, error: false }));
    } catch (error) {
      console.error("Error deleting user from storage:", error);
    }
  },
  deleteUserFailure: (error) => set(() => ({ loading: false, error })),

  signOut: async () => {
    const { signOut } = useAuth(); // Get Clerk's signOut function
    try {
      await signOut(); // Clerk's signOut to end the session
      await AsyncStorage.removeItem("currentUser"); // Clear local state
      set(() => ({ currentUser: null, loading: false, error: false }));
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  },
}));

