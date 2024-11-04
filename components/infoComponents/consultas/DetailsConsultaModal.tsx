import React from "react";
import { H3, Label, Text, YStack } from "tamagui";
import { Consulta } from "@/types";
import InfoModal from "@/components/bases/InfoModal";

export default (props: {
  consulta: Consulta;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <InfoModal open={props.open} onOpenChange={props.onOpenChange}>
      <H3 fontWeight={"bold"}>Detalles de la Consulta</H3>
      <YStack>
        <YStack>
          <Label fontWeight={"bold"} fontSize={"$4"}>
            Medico
          </Label>
          <Text
            borderColor={"$borderColor"}
            borderWidth={1}
            padding="$3"
            borderRadius={"$3"}
            fontSize={"$3"}
          >
            {props.consulta.medico.nombre} {props.consulta.medico.apellido}
          </Text>
        </YStack>
        <YStack>
          <Label fontWeight={"bold"} fontSize={"$4"}>
            Área
          </Label>
          <Text
            borderColor={"$borderColor"}
            borderWidth={1}
            padding="$3"
            borderRadius={"$3"}
            fontSize={"$3"}
          >
            {props.consulta.medico.especialidad.especialidad}
          </Text>
        </YStack>

        <YStack>
          <Label fontWeight={"bold"} fontSize={"$4"}>
            Diagnóstico
          </Label>
          <Text
            borderColor={"$borderColor"}
            borderWidth={1}
            padding="$3"
            borderRadius={"$3"}
            fontSize={"$3"}
          >
            {props.consulta.diagnostico}
          </Text>
        </YStack>
        <YStack>
          <Label fontWeight={"bold"} fontSize={"$4"}>
            Tratamiento
          </Label>
          <Text
            borderColor={"$borderColor"}
            borderWidth={1}
            padding="$3"
            borderRadius={"$3"}
            fontSize={"$3"}
          >
            {props.consulta.tratamiento}
          </Text>
        </YStack>
      </YStack>
    </InfoModal>
  );
};
