import { Tension } from "@/types";
import { ActivitySquare } from "@tamagui/lucide-icons";
import React from "react";
import { Text, XStack, YStack } from "tamagui";

export default (props: { tension: Tension}) => {
  return (
    <XStack alignItems="center" justifyContent="space-between" flex={1}>
      <XStack alignItems="center" gap={"$3"}>
        <ActivitySquare />
        <YStack>
          <Text fontWeight={"normal"} fontSize={"$3"}>
            Diatósica: {props.tension.diastolic}
          </Text>
          <Text fontWeight={"normal"} fontSize={"$3"}>
            Sistólica: {props.tension.sistolic}
          </Text>
        </YStack>
      </XStack>
      <Text fontWeight={"normal"} fontSize={"$3"}>
            {props.tension.create_at.split("T")[0]}
      </Text>
    </XStack>
  );
};
