import React from "react";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { XStack, H6, Image } from "tamagui";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserProfile from "./UserProfile";
import { User } from "@/types";

interface Props extends BottomTabHeaderProps {
  user?: User;
}

export default (props: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <XStack
      backgroundColor={"$background"}
      elevation={"$1"}
      zIndex={1000}
      padding="$4"
      justifyContent="space-between"
      alignItems="center"
      width={"100%"}
      paddingTop={insets.top + 5}
    >
      <XStack gap={"$2"} alignItems="center">
        <Image
          width={"$4"}
          height={"$4"}
          source={require("../assets/images/icon.png")}
        />
        <H6>Medic Kit P</H6>
      </XStack>
      <UserProfile user={props.user}/>
    </XStack>
  );
};
