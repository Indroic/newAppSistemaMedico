import React from "react";
import {
  Button,
  H3,
  Progress,
  Text,
  XStack,
  YStack,
} from "tamagui";
import {
  CalendarPlus,
  File,
  Stethoscope,
  Trash,
} from "@tamagui/lucide-icons";
import { Examen } from "@/types";

import EditExamModal from "@/components/editForms/EditExamModal";
import { deleteExamen } from "@/axios";
import { useAuthStore, useExamenesStore } from "@/stores";

import InfoModal from "@/components/bases/InfoModal";
import { downloadFile } from "@/utils/files";

export default (props: {
  exam: Examen;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [downloaded, setDownloaded] = React.useState(false);
  const [downloadProgress, setDownloadProgress] = React.useState(0);
  const { token } = useAuthStore();
  const { removeExamen } = useExamenesStore();

  return (
    <InfoModal
      open={props.open}
      onOpenChange={props.onOpenChange}
      header={
        <YStack
          padding="$4"
          alignItems="center"
          gap={"$2"}
          borderBottomStartRadius={"$4"}
          borderBottomEndRadius={"$4"}
          backgroundColor={"$color5"}
        >
          <EditExamModal exam={props.exam} />
          <YStack alignItems="center">
            <H3>{props.exam.titulo}</H3>
          </YStack>
          <Button
            size={"$3"}
            icon={<Trash />}
            position="absolute"
            right={0}
            bottom={0}
            backgroundColor={"$colorTransparent"}
            onPress={() =>
              deleteExamen(props.exam.id, token).then(() => {
                props.onOpenChange(!props.open);
                removeExamen(props.exam.id);
              })
            }
          />
        </YStack>
      }
    >
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
            {props.exam.categoria.categoria}
          </Text>
        </XStack>

        <YStack gap={"$2"}>
          <XStack
            gap={"$2"}
            borderRadius={"$3"}
            borderWidth={1}
            borderColor={"$borderColor"}
            maxWidth={""}
            alignItems="center"
            onPress={() => {
              setDownloaded(true);
              setDownloadProgress(20);
              downloadFile(
                props.exam.archivo
              ).then(() => {
                setDownloadProgress(100);
                setTimeout(() => {
                  setDownloaded(false);
                }, 1000);
              })
              
            }}
          >
            <XStack
              padding="$2"
              borderRightWidth={1}
              borderColor={"$borderColor"}
            >
              <File color={"$color10"} />
            </XStack>
            <Text padding="$2" flex={1}>
              {props.exam.archivo.split("/").pop()}
            </Text>
          </XStack>
          {downloaded && (
            <Progress
              backgroundColor={"$color4"}
              size={"$3"}
              value={downloadProgress}
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
              animation={"medium"}
              animateOnly={["opacity"]}
            >
              <Progress.Indicator
                backgroundColor={"$color10"}
                animation={"fast"}
              ></Progress.Indicator>
            </Progress>
          )}
        </YStack>

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
            <CalendarPlus color={"$color10"} />
          </XStack>
          <Text padding="$2" flex={1}>
            {props.exam.create_at.split("T")[0]}
          </Text>
        </XStack>

        <Text
          borderColor={"$borderColor"}
          borderWidth={1}
          borderRadius={"$3"}
          padding="$2"
          minHeight={"$10"}
        >
          {props.exam.descripcion}
        </Text>
      </YStack>
    </InfoModal>
  );
};
