import React from "react";
import {
  Avatar,
  Button,
  H3,
  Progress,
  Sheet,
  Text,
  XStack,
  YStack,
} from "tamagui";
import {
  Calendar,
  CalendarPlus,
  File,
  Phone,
  Stethoscope,
  Trash,
} from "@tamagui/lucide-icons";
import { Examen } from "@/types";
import XButton from "@/components/bases/XButton";
import * as FileSystem from "expo-file-system";
import * as Linking from "expo-linking";
import { shareAsync } from "expo-sharing";
import * as Constants from "expo-constants";

import EditExamModal from "@/components/editForms/EditExamModal";
import { deleteExamen } from "@/axios";
import { useAuthStore, useExamenesStore } from "@/stores";
import * as mime from "mime";
import InfoModal from "@/components/bases/InfoModal";

export default (props: {
  exam: Examen;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [downloaded, setDownloaded] = React.useState(false);
  const [downloadProgress, setDownloadProgress] = React.useState(0);
  const fileName: string = props.exam.archivo.split("/").pop() as string;
  const { token } = useAuthStore();
  const { removeExamen } = useExamenesStore();

  async function saveFile(uri: string, filename: string, mimetype: string) {
    try {
      if (
        Constants.default.platform?.android ||
        Constants.default.platform?.ios
      ) {
        const permissions =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

        if (permissions.granted) {
          const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          const fileUri =
            await FileSystem.StorageAccessFramework.createFileAsync(
              permissions.directoryUri,
              filename,
              mimetype
            );

          await FileSystem.writeAsStringAsync(fileUri, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });

          alert("Archivo descargado Correctamente!!");
        } else {
          shareAsync(uri);
        }
      } else {
        shareAsync(uri);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const callBack = (downloadProgress: FileSystem.DownloadProgressData) => {
    setDownloadProgress(Math.floor(Math.random() * 100));
  };

  const downloadResumable = FileSystem.createDownloadResumable(
    props.exam.archivo,
    FileSystem.documentDirectory + "/MedicDocs/" + fileName,
    {},
    callBack
  );

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
              setDownloadProgress(100);
              downloadResumable.downloadAsync().then((file) => {
                setDownloadProgress(100);
                saveFile(
                  file?.uri as string,
                  fileName,
                  mime.default.getType(file?.uri as string) as string
                ).then(() => {
                  alert("Archivo descargado Correctamente!!");
                });
              });
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
              backgroundColor={"$color10"}
              size={"$3"}
              value={downloadProgress}
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
              animation={"medium"}
              animateOnly={["opacity"]}
            >
              <Progress.Indicator
                backgroundColor={"$color4"}
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
