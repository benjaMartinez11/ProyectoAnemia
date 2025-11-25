import React from "react";
import { Pressable, Text, ViewStyle, TextStyle } from "react-native";

// Define a type for the Button props
interface ButtonProps {
  children: React.ReactNode;  // children can be any valid React node (text, components, etc.)
  style?: ViewStyle;         // optional custom styles for the Pressable container
  textStyle?: TextStyle;     // optional custom styles for the Text inside the button
  onPress?: () => void;      // onPress handler
}

export function Button({ children, style, textStyle, onPress, ...props }: ButtonProps) {
  return (
    <Pressable
      style={[
        {
          paddingVertical: 10,
          paddingHorizontal: 16,
          backgroundColor: "#007bff",
          borderRadius: 6,
          alignItems: "center",
          justifyContent: "center",
        },
        style, // custom style can be passed here
      ]}
      onPress={onPress}  // Ensure onPress handler is passed down
      {...props}  // other props (like accessibility, etc.)
    >
      <Text
        style={[
          { color: "white", fontWeight: "600", fontSize: 16 },
          textStyle,  // custom text style can be passed here
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}
