import { X, Phone, Mail, IdCard, Pencil } from "@tamagui/lucide-icons";
import React from "react";
import { Avatar, Button, H3, H5, Sheet, Text, XStack, XStackProps, YStack } from "tamagui";
import Input from "./Input";
import { User } from "@/types";
import { useAuthStore, useMicelaneusStore } from "@/stores";
import CustomButton from "./CustomButton";
import XButton from "./XButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as yup from "yup";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useFormik } from "formik";
import { updateUser } from "@/axios";

interface Props extends XStackProps {
  user: User;
}
export default (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const { avatarPlaceholder } = useMicelaneusStore();
  const [avatar, setAvatar] = React.useState<string>(props.user.avatar ? props.user.avatar : avatarPlaceholder);
  const {token, setUser} = useAuthStore()

  const cacheAvatar = async (uri: string) => {
    const cacheDirectory = FileSystem.cacheDirectory;
    const fileName = uri.split("/").pop();
    const filePath = `${cacheDirectory}${fileName}`;
    await FileSystem.copyAsync({ from: uri, to: filePath });
    return filePath;
  }

  const selectAavatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [3, 4],
    });

    if (!result.canceled) {
      const filePath = await cacheAvatar(result.assets[0].uri);
      setAvatar(filePath);
      formik.setFieldValue("avatar", filePath)
    }
  };

  const validator = yup.object().shape({
    first_name: yup
      .string()
      .matches(/^[^\s]+$/, "No se permiten espacios")
      .min(3, "El primer nombre debe tener al menos 3 caracteres")
      .required("El primer nombre es requerido"),
    last_name: yup
      .string()
      .matches(/^[^\s]+$/, "No se permiten espacios")
      .min(3, "El primer apellido debe tener al menos 3 caracteres")
      .required("El primer apellido es requerido"),
    email: yup
      .string()
      .matches(/^[^\s]+$/, "No se permiten espacios")
      .email("El correo electrónico debe ser válido")
      .required("El correo electrónico es requerido"),
    ci: yup
      .number()
      .min(7, "El CI debe tener al menos 3 caracteres")
      .required("El CI es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      avatar: avatar,
      first_name: props.user.first_name,
      last_name: props.user.last_name,
      email: props.user.email,
      ci: props.user.ci,
    },
    onSubmit: (values) => {
      const update = async () => {
        try {
          const result = await updateUser(props.user?.id as string, {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            ci: values.ci
          }, token)

          if (props.user.avatar !== avatar) {
              const uploading = await FileSystem.uploadAsync(
                `https://backend-medics.vercel.app/api/profile/${props.user.id}/`,
                formik.values.avatar,
                {
                  fieldName: "avatar",
                  httpMethod: "PATCH",
                  uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Token ${token}`,
                  },
                }
              );

              let newuser: User = JSON.parse(uploading.body)
              setUser(newuser)
              formik.setSubmitting(false);
              setOpen(false);
              return
          }

          let newuser: User = result
          setUser(newuser)
          formik.setSubmitting(false);
          setOpen(false);
          return
        } catch (error: any) {
          const errors = error.response.data;
          Object.keys(errors).forEach((key) => {
            formik.setFieldError(key, errors[key]);
          });
          formik.setSubmitting(false);
          return;
        }
      };
      update();
    },
    validationSchema: validator,
  });


  return (
    <XStack {...props} alignItems="center" gap={"$3"} position="absolute" right={0} bottom={0} zIndex={1000}>
      <Button
        size={"$3"}
        icon={<Pencil />}
        backgroundColor={"$colorTransparent"}
        onPress={(event) => {setOpen(!open); props.onPress?.(event)}}
      />
      <Sheet
        open={open}
        modal
        dismissOnSnapToBottom
        onOpenChange={setOpen}
        snapPoints={[60, 60]}
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
          padding="$4"
          gap="$5"
        >
          <XButton onPress={() => setOpen(!open)} />
          <Sheet.ScrollView>
            <H3>Editar Perfil</H3>
            <YStack gap={"$2"} alignItems="center">
              <Avatar circular size={"$7"} onPress={() => selectAavatar()}>
                <Avatar.Image
                  src={avatar}
                />
              </Avatar>
              <XStack
                alignItems="center"
                justifyContent="space-between"
                gap={"$4"}
              >
                <Input
                  label="Nombre"
                  flex={1}
                  placeholder={props.user?.first_name}
                  onChangeText={(text) =>
                    formik.setFieldValue("first_name", text)
                  }
                  errorMessage={formik.errors.first_name}
                  isValid={
                    formik.errors.first_name !== undefined
                      ? formik.errors.first_name
                        ? false
                        : true
                      : formik.values.first_name
                      ? true
                      : undefined
                  }
                  value={formik.values.first_name}

                />
                <Input
                  label="Apellido"
                  flex={1}
                  placeholder={props.user?.last_name}
                  onChangeText={(text) =>
                    formik.setFieldValue("last_name", text)
                  }
                  errorMessage={formik.errors.last_name}
                  isValid={
                    formik.errors.last_name !== undefined
                      ? formik.errors.last_name
                        ? false
                        : true
                      : formik.values.last_name
                      ? true
                      : undefined
                  }
                  value={formik.values.last_name}
                />
              </XStack>
              <YStack width={"100%"}>
                <Input
                  label="Cédula de Identidad"
                  placeholder={props.user?.ci ? props.user?.ci.toString() : "C.I"}
                  onChangeText={(text) =>
                    formik.setFieldValue("ci", text)
                  }
                  errorMessage={formik.errors.ci}
                  isValid={
                    formik.errors.ci !== undefined
                      ? formik.errors.ci
                        ? false
                        : true
                      : formik.values.ci
                      ? true
                      : undefined
                  }
                  value={formik.values.ci.toString()}
                />
                <Input
                  label="Correo Electrónico"
                  placeholder={props.user?.email}
                  onChangeText={(text) =>
                    formik.setFieldValue("email", text)
                  }
                  errorMessage={formik.errors.email}
                  isValid={
                    formik.errors.email !== undefined
                      ? formik.errors.email
                        ? false
                        : true
                      : formik.values.email
                      ? true
                      : undefined
                  }
                  value={formik.values.email}
                />
              </YStack>
              <CustomButton text="Guardar" onPress={() => formik.handleSubmit()} />
            </YStack>
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    </XStack>
  );
};
