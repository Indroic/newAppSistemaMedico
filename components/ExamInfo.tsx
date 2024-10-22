import { Examen, Medico } from "@/types";
import { File } from "@tamagui/lucide-icons";
import React from "react";
import { Text, XStack, YStack } from "tamagui";

export default (props: { exam: Examen; avatarPlaceholder: string }) => {
  return (
    <XStack alignItems="center" justifyContent="space-between" flex={1}>
      <XStack alignItems="center" gap={"$3"}>
        <File />
        <YStack>
          <Text fontWeight={"bold"} fontSize={"$4"}>
            {props.exam.titulo}
          </Text>
          <Text fontWeight={"normal"} fontSize={"$3"}>
            {props.exam.categoria.categoria}
          </Text>
        </YStack>
      </XStack>
      <Text fontWeight={"normal"} fontSize={"$3"}>
            {props.exam.create_at.split("T")[0]}
      </Text>
    </XStack>
  );
};
