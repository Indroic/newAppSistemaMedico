import React from "react";
import { Avatar, Button, H3, Sheet, Text, XStack, YStack } from "tamagui";
import EditMedicModal from "./EditMedicModal";
import { Hospital, Phone, Stethoscope, Trash } from "@tamagui/lucide-icons";
import { Medico } from "@/types";
import XButton from "./XButton";
import { useAuthStore, useMedicosStore, useMicelaneusStore } from "@/stores";
import AvatarMedico from "./AvatarMedico";
import { deleteMedico } from "@/axios";
import { AxiosError } from "axios";

export default (props: {
  medic: Medico;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { avatarPlaceholder } = useMicelaneusStore();
  const { token } = useAuthStore();
  const { removeMedico } = useMedicosStore();

  return (
    <Sheet
      open={props.open}
      modal
      dismissOnSnapToBottom
      onOpenChange={props.onOpenChange}
      snapPoints={[50, 60]}
    >
      <Sheet.Frame
        borderWidth={1}
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
        <XButton onPress={() => props.onOpenChange(!props.open)} />

        <EditMedicModal medic={props.medic} />

        <YStack gap={"$4"}>
          <YStack
            padding="$4"
            alignItems="center"
            gap={"$2"}
            borderBottomStartRadius={"$4"}
            borderBottomEndRadius={"$4"}
            backgroundColor={"$color5"}
          >
            <AvatarMedico
              medic={props.medic as Medico}
              avatarPlaceholder={avatarPlaceholder}
              size={"$10"}
            />
            <YStack alignItems="center">
              <H3>
                {props.medic?.nombre} {props.medic?.apellido}
              </H3>
            </YStack>

            <Button
              size={"$3"}
              icon={<Trash />}
              position="absolute"
              right={0}
              bottom={0}
              backgroundColor={"$colorTransparent"}
              onPress={() =>
                deleteMedico(props.medic.id, token).then(() => {
                  props.onOpenChange(!props.open);
                  removeMedico(props.medic.id);
                })
              }
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
                <Stethoscope color={"$color10"} />
              </XStack>
              <Text padding="$2" flex={1}>
                {props.medic?.especialidad?.especialidad}
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
                <Phone color={"$color10"} />
              </XStack>
              <Text padding="$2" flex={1}>
                {props.medic?.telefono}
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
                <Hospital color={"$color10"} />
              </XStack>
              <Text padding="$2" flex={1}>
                {props.medic?.institucion}
              </Text>
            </XStack>
          </YStack>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
};
