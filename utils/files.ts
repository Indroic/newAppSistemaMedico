import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import * as Constants from "expo-constants";
import * as mime from "mime";
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

export async function downloadFile(
  url: string
) {
  const filename: string = url.split("/").pop() as string;
  const { uri } = await FileSystem.downloadAsync(url, `${FileSystem.cacheDirectory}${filename}`);
  const mimetype = mime.default.getType(filename) as string;
  try {
    if (
      Constants.default.platform?.android ||
      Constants.default.platform?.ios
    ) {
      const permissions = await getDirectory();

      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype
        );

        await FileSystem.writeAsStringAsync(fileUri, base64, {
          encoding: FileSystem.EncodingType.Base64,
        });

        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Terminado',
          textBody: 'El archivo se descargo correctamente en la carpeta seleccionada!!',
        })
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  } catch (error) {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: `Ha ocurrido un error durante la descarga del archivo, por favor intente nuevamente!!, error: ${error}`,
    })
  }

  FileSystem.deleteAsync(uri);
}

async function getDirectory() {
  let permission =
    await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
  if (permission.granted) {
    return {
      granted: true,
      directoryUri: permission.directoryUri,
    };
  }

  return {
    granted: false,
    directoryUri: "",
  };
}
