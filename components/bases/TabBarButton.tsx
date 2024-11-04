import React from "react";
import { StyleSheet } from "react-native";
import { Text, XStack, YStack } from "tamagui";
import type { TabBarButtonProps } from "@/types";

const TabBarButton = (props: TabBarButtonProps) => {
  const { isFocused, label, routeName, tabBarIcon } = props;

  const color = isFocused ? "$accentColor" : "$color5";

  return (
    <YStack
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      flex={1}
      alignContent="center"
      justifyContent="center"
      alignItems="center"
      enterStyle={{ opacity: 0 }}
      exitStyle={{ opacity: 0 }}
      animation={[
        "fast",
        {
          opacity: {
            overshootClamping: true,
          },
        },
      ]}
      animateOnly={["opacity"]}
    >
      {tabBarIcon ? (
        tabBarIcon({
          focused: isFocused,
          color: color,
        })
      ) : (
        <Text>{label}</Text>
      )}
      <Text color={color} fontWeight={"bold"}>
        {routeName}
      </Text>
    </YStack>
  );
};

export default TabBarButton;
