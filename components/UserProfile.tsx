import { X, Mail, IdCard, LogOut } from "@tamagui/lucide-icons";
import React from "react";
import { Avatar, Button, H3, H5, Sheet, Text, XStack, YStack } from "tamagui";
import EditUserProfileModal from "./EditUserProfileModal";
import { User } from "@/types";
import { useMicelaneusStore } from "@/stores";
import XButton from "./XButton";
import { useAuth } from "@/app/context/AuthContext";
import { router } from "expo-router";

export default (props: { user: User }) => {
  const [open, setOpen] = React.useState(false);
  const { avatarPlaceholder } = useMicelaneusStore();

  const { onLogout} = useAuth();

  return (
    <XStack onPress={() => setOpen(!open)} alignItems="center" gap={"$3"}>
      <Text>{props.user.username}</Text>
      <Avatar circular>
        <Avatar.Image
          src={props.user.avatar ? props.user.avatar : avatarPlaceholder}
        />
      </Avatar>
      <Sheet
        open={open}
        modal
        dismissOnSnapToBottom
        onOpenChange={setOpen}
        snapPoints={[50, 60]}
      >
        <Sheet.Frame
          borderTopWidth={1}
          borderColor="$borderColor"
          enterStyle={{ y: -10, opacity: 0 }}
          exitStyle={{ y: -10, opacity: 0 }}
          animation={[
            "fast",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
        >
          <XButton onPress={() => setOpen(!open)} />
          <YStack gap={"$4"}>
            <YStack
              padding="$4"
              alignItems="center"
              gap={"$2"}
              borderBottomStartRadius={"$4"}
              borderBottomEndRadius={"$4"}
              backgroundColor={"$color5"}
              position="relative"
            >
              <Button
                backgroundColor={"$colorTransparent"}
                position="absolute"
                top={0}
                left={0}
                onPress={() => {
                  setOpen(!open);
                  router.push("/login");
                  onLogout()
                }}
                icon={<LogOut />}
              />
              <Avatar circular size={"$10"}>
                <Avatar.Image
                  src={
                    props.user.avatar ? props.user.avatar : avatarPlaceholder
                  }
                />
              </Avatar>
              <YStack alignItems="center">
                <H3>
                  {props.user.first_name} {props.user.last_name}
                </H3>
                <H5>@{props.user.username}</H5>
              </YStack>
              <EditUserProfileModal
                user={props.user}
                onPress={() => setOpen(!open)}
              />
            </YStack>

            <YStack padding="$3" gap={"$3"}>
              <XStack
                gap={"$2"}
                borderRadius={"$3"}
                borderWidth={1}
                borderColor={"$borderColor"}
                maxWidth={""}
                alignItems="center"
              >
                <XStack
                  padding="$2"
                  borderRightWidth={1}
                  borderColor={"$borderColor"}
                >
                  <IdCard color={"$color10"} />
                </XStack>
                <Text padding="$2" flex={1}>
                  {props.user.ci}
                </Text>
              </XStack>
              <XStack
                gap={"$2"}
                borderRadius={"$3"}
                borderWidth={1}
                borderColor={"$borderColor"}
                maxWidth={""}
                alignItems="center"
              >
                <XStack
                  padding="$2"
                  borderRightWidth={1}
                  borderColor={"$borderColor"}
                >
                  <Mail color={"$color10"} />
                </XStack>
                <Text padding="$2" flex={1}>
                  {props.user.email}
                </Text>
              </XStack>
            </YStack>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </XStack>
  );
};
