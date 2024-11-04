import { Consulta } from "@/types";
import React from "react";
import { Text, XStack, YStack } from "tamagui";

export default (props: { consulta: Consulta }) => {
  return (
    <XStack alignItems="center" justifyContent="space-between" flex={1}>
      <YStack gap={"$2"}>
        <XStack>
          <Text fontWeight={"bold"} fontSize={"$4"}>
            {props.consulta.medico.nombre} {props.consulta.medico.apellido}
          </Text>
        </XStack>
        <Text>{props.consulta.medico.especialidad.especialidad}</Text>
      </YStack>
      <Text>{props.consulta.create_at.split("T")[0]}</Text>
    </XStack>
  );
};
