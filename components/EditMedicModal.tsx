import { X, Phone, Mail, IdCard, Pencil } from "@tamagui/lucide-icons";
import React from "react";
import {
  Avatar,
  Button,
  Form,
  H3,
  H5,
  Sheet,
  Text,
  XStack,
  YStack,
} from "tamagui";
import Input from "./Input";
import { Medico, User } from "@/types";
import { useAuthStore, useMedicosStore, useMicelaneusStore } from "@/stores";
import SelectC from "./SelectC";
import XButton from "./XButton";
import * as yup from "yup";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useFormik } from "formik";
import { updateMedico } from "@/axios";
import CustomButton from "./CustomButton";

export default (props: { medic: Medico }) => {
  const [open, setOpen] = React.useState(false);
  const [selectImage, setSelectImage] = React.useState<string>("");
  const { token } = useAuthStore();
  const { avatarPlaceholder } = useMicelaneusStore();
  const { updateMedico: updateMedicoStore, especialidades } = useMedicosStore();

  const selectItems = React.useMemo(() => {
    return especialidades.map((especialidad) => {
      return { value: especialidad.id, text: especialidad.especialidad };
    });
  }, [especialidades]);

  const cacheAvatar = async (uri: string) => {
    const cacheDirectory = FileSystem.cacheDirectory;
    const fileName = uri.split("/").pop();
    const filePath = `${cacheDirectory}${fileName}`;
    await FileSystem.copyAsync({ from: uri, to: filePath });
    return filePath;
  };

  const selectAavatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [3, 4],
    });

    if (!result.canceled) {
      const filePath = await cacheAvatar(result.assets[0].uri);
      setSelectImage(filePath);
    }
  };

  const validator = yup.object().shape({
    nombre: yup.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    apellido: yup
      .string()
      .min(3, "El apellido debe tener al menos 3 caracteres"),
    telefono: yup
      .string()
      .matches(/^0[0-9]{1,10}$/, "El Número de Teléfono es inválido")
      .min(11, "El teléfono debe tener al menos 11 caracteres")
      .max(11, "El teléfono debe tener máximo 11 caracteres"),
    institucion: yup
      .string()
      .min(3, "La institución debe tener al menos 3 caracteres"),
    especialidad: yup.number().min(1, "La especialidad es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      nombre: props.medic?.nombre,
      apellido: props.medic?.apellido,
      telefono: props.medic?.telefono.replace("+58", "0"),
      institucion: props.medic?.institucion,
      especialidad: props.medic?.especialidad.id,
      agregado_por: props.medic?.agregado_por,
    },
    onSubmit: (values) => {
      const updateMedicoRequest = async () => {
        try {
          let result = await updateMedico({
            data: values,
            id: props.medic.id,
            token: token,
          });
          if (selectImage !== "") {
            let n = JSON.parse((await FileSystem.uploadAsync(
              `https://backend-medics.vercel.app/api/medicos/${props.medic?.id}/`,
              selectImage,
              {
                fieldName: "foto",
                httpMethod: "PATCH",
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Token ${token}`,
                },
              }
            )).body);

            let newMedico = {
              ...n,
            };
  
            updateMedicoStore(newMedico);
            formik.setSubmitting(false);
            setOpen(!open);

            return
            
          }
         
          let newMedico = {
            ...result.data,
          };

          updateMedicoStore(newMedico);
          formik.setSubmitting(false);
          setOpen(!open);
        } catch (error: any) {
          let errors = error;
          formik.setSubmitting(false);
          Object.keys(errors).forEach((key) => {
            formik.setFieldError(key, errors[key]);
          });
        }
      };

      updateMedicoRequest()
    },
    validationSchema: validator,
  });

  return (
    <XStack alignItems="center" gap={"$3"} position="absolute" zIndex={1000}>
      <Button
        size={"$3"}
        icon={<Pencil />}
        backgroundColor={"$colorTransparent"}
        onPress={() => setOpen(!open)}
      />
      <Sheet
        open={open}
        modal
        dismissOnSnapToBottom
        onOpenChange={setOpen}
        snapPoints={[60, 60]}
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
          padding="$4"
          gap="$5"
        >
          <XButton onPress={() => setOpen(!open)} />
          <Sheet.ScrollView>
            <H3>Editar Médico</H3>
            <Form paddingHorizontal="$4">
              <YStack gap={"$2"} alignItems="center">
                <Avatar circular size={"$10"} onPress={() => selectAavatar()}>
                  <Avatar.Image
                    src={
                      selectImage
                        ? selectImage
                        : props.medic?.foto
                        ? props.medic.foto
                        : avatarPlaceholder
                    }
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
                    placeholder={props.medic?.nombre}
                    onChangeText={(text) =>
                      formik.setFieldValue("nombre", text)
                    }
                    isValid={
                      formik.errors.nombre !== undefined
                        ? formik.errors.nombre
                          ? false
                          : true
                        : formik.values.nombre
                        ? true
                        : undefined
                    }
                    errorMessage={formik.errors.nombre}
                    disabled={formik.isSubmitting}
                    value={formik.values.nombre}
                  />
                  <Input
                    label="Apellido"
                    flex={1}
                    placeholder={props.medic?.apellido}
                    onChangeText={(text) =>
                      formik.setFieldValue("apellido", text)
                    }
                    isValid={
                      formik.errors.apellido !== undefined
                        ? formik.errors.apellido
                          ? false
                          : true
                        : formik.values.apellido
                        ? true
                        : undefined
                    }
                    errorMessage={formik.errors.apellido}
                    disabled={formik.isSubmitting}
                    value={formik.values.apellido}
                  />
                </XStack>
                <YStack width={"100%"}>
                  <SelectC
                    items={selectItems}
                    label="Especialidad"
                    placeholder={props.medic?.especialidad?.especialidad}
                    onValueChange={(value) =>
                      formik.setFieldValue("especialidad", value)
                    }
                    errorMessage={formik.errors.especialidad}
                    isValid={
                      formik.errors.especialidad !== undefined
                        ? formik.errors.especialidad
                          ? false
                          : true
                        : formik.values.especialidad
                        ? true
                        : undefined
                    }
                    disabled={formik.isSubmitting}
                  />
                  <Input
                    label="Número Telefónico"
                    placeholder={props.medic?.telefono}
                    onChangeText={(text) =>
                      formik.setFieldValue("telefono", text)
                    }
                    isValid={
                      formik.errors.telefono !== undefined
                        ? formik.errors.telefono
                          ? false
                          : true
                        : formik.values.telefono
                        ? true
                        : undefined
                    }
                    errorMessage={formik.errors.telefono}
                    disabled={formik.isSubmitting}
                    value={formik.values.telefono}
                  />
                  <Input
                    label="Institución"
                    placeholder={props.medic?.institucion}
                    onChangeText={(text) =>
                      formik.setFieldValue("institucion", text)
                    }
                    isValid={
                      formik.errors.institucion !== undefined
                        ? formik.errors.institucion
                          ? false
                          : true
                        : formik.values.institucion
                        ? true
                        : undefined
                    }
                    errorMessage={formik.errors.institucion}
                    disabled={formik.isSubmitting}
                    value={formik.values.institucion}
                  />
                </YStack>
                <CustomButton
                  text="Guardar"
                  onPress={() => formik.handleSubmit()}
                  disabled={formik.isSubmitting}
                />
              </YStack>
            </Form>
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    </XStack>
  );
};
