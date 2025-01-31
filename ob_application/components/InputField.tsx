import { InputFieldProps } from "@/types/type";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

import { Feather } from "@expo/vector-icons";

const InputField = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  onIconPress, // Callback for icon press
  ...props
}: InputFieldProps & { onIconPress?: () => void }) => (
  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <View className="my-2 w-full">
      {label && (
        <Text
          className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}
          style={{ fontSize: width > 320 ? 16 : 14 }}
        >
          {label}
        </Text>
      )}
      <View
        className={`flex flex-row justify-start items-center relative rounded-lg 
          border border-primary-300 shadow-none ${containerStyle}`}
        style={{ paddingHorizontal: width * 0.04 }}
      >
        <TextInput
          className={`rounded-lg flex-1 font-JakartaSemiBold 
          text-primary-500 placeholder-neutral-400 ${inputStyle}`}
          style={{
            fontSize: width > 320 ? 14 : 12,
            maxHeight: 50,
            paddingVertical: 5,
          }}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          multiline={false}
          numberOfLines={1}
          {...props}
        />
        {icon && typeof icon === "string" ? (
          <TouchableWithoutFeedback onPress={onIconPress}>
            <Feather
              name={icon}
              size={20}
              style={{ marginHorizontal: 8, ...iconStyle }}
            />
          </TouchableWithoutFeedback>
        ) : icon ? (
          <TouchableWithoutFeedback onPress={onIconPress}>
            <Image
              source={icon}
              className={`w-5 h-5 text-primary-500 ${iconStyle}`}
              style={{ marginHorizontal: 8 }}
            />
          </TouchableWithoutFeedback>
        ) : null}
      </View>
    </View>
  </KeyboardAvoidingView>
);

export default InputField;
