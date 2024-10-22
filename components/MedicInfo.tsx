import { Medico } from "@/types";
import React from "react";
import { Text, XStack, YStack } from "tamagui";
import AvatarMedico from "./AvatarMedico";

export default (props: { medic: Medico; avatarPlaceholder: string }) => {
  return (
    <XStack alignItems="center" justifyContent="space-between" flex={1}>
      <XStack gap={"$2"}>
        <AvatarMedico
          medic={props.medic}
          avatarPlaceholder={props.avatarPlaceholder}
        />
        <YStack>
          <Text fontWeight={"bold"} fontSize={"$4"}>
            {props.medic?.nombre} {props.medic?.apellido}
          </Text>

          <Text fontWeight={"normal"} fontSize={"$3"}>
            {props.medic?.especialidad.especialidad}
          </Text>
        </YStack>
      </XStack>
      <Text fontWeight={"normal"} fontSize={"$3"}>
        {props.medic.create_at.split("T")[0]}
      </Text>
    </XStack>
  );
};
