import { ButtonProps } from "@/types/type";
import { Text, TouchableOpacity } from "react-native";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-primary-500 border-[1px]";
    case "primary":
      return "bg-primary-500";
    default:
      return "bg-[#662113]"; // Default color
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-primary-500";
    case "danger":
      return "text-red-100";
    case "secondary":
      return "text-gray-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant, // Add bgVariant
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={`w-full rounded-full p-3 flex flex-row justify-center items-center shadow-md
      shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`} // Include getBgVariantStyle
    {...props}
  >
    {IconLeft && <IconLeft />}
    <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>
      {title}
    </Text>
    {IconRight && <IconRight />}
  </TouchableOpacity>
);

export default CustomButton;
