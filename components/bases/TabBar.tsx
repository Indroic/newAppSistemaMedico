import React from "react";
import TabBarButton from "./TabBarButton";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ContainerX } from "./layouts";

export default ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <ContainerX
      flex={1}
      maxHeight={70}
      backgroundColor={"$background"}
      padding={"$4"}
      borderRadius={"$12"}
      zIndex={1000}
      position={"absolute"}
      bottom={insets.bottom + 20}
      marginHorizontal={"$3"}
      animateOnly={["backgroundColor"]}
      elevation={"$1"}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const label =
          options.tabBarLabel !== undefined
            ? typeof options.tabBarLabel === "function"
              ? options.tabBarLabel({
                  focused: isFocused,
                  color: "some-color",
                  position: "below-icon",
                  children: route.name,
                })
              : options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={options.title || route.name}
            label={label}
            tabBarIcon={
              options.tabBarIcon as
                | ((props: {
                    focused: boolean;
                    color: string;
                    size?: string | number | undefined;
                  }) => React.ReactNode)
                | undefined
            }
          />
        );
      })}
    </ContainerX>
  );
};
