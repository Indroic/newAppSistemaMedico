import React from "react";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "react-native";
import UserProfile from "../UserProfile";
import { User } from "@/types";
import { ContainerX } from "./layouts";
import { H6 } from "tamagui";

interface Props extends BottomTabHeaderProps {
  user: User;
}

export default (props: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <ContainerX
      backgroundColor={"$background"}
      elevation={"$1"}
      zIndex={1000}
      padding="$4"
      justifyContent="space-between"
      alignItems="center"
      width={"100%"}
      paddingTop={insets.top + 5}
    >
      <ContainerX gap={"$2"} alignItems="center">
        <Image
          style={{ width: 16, height: 16 }}
          source={require("@/assets/images/icon-rounded.png")}
        />
        <H6>Medic Kit P</H6>
      </ContainerX>
      <UserProfile user={props.user}/>
    </ContainerX>
  );
};
