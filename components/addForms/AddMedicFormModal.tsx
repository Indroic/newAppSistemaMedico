import React from "react";
import FormModal from "../bases/AddFormModal";
import { Avatar, Form, H3, YStack } from "tamagui";
import { ContainerX } from "../bases/layouts";
import Input from "../bases/Input";
import SelectC from "../bases/SelectC";
import CustomButton from "../bases/CustomButton";
import { useAuthStore, useMedicosStore, useMicelaneusStore } from "@/stores";
import * as yup from "yup";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useFormik } from "formik";
import { Medico } from "@/types";
import { addMedico } from "@/axios";

export default () => {
  const { avatarPlaceholder } = useMicelaneusStore();
  const [imagen, setImagen] = React.useState<string>(avatarPlaceholder);
  const [open, setOpen] = React.useState(false);
  const { especialidades, addMedico: addMedicoStore } = useMedicosStore();
  const { token, user } = useAuthStore();

  const selectList = React.useMemo(() => {
    let filtrado = especialidades.filter((especialidad) => {
      if (!especialidad.genero) {
        return especialidad;
      }
  
      if (especialidad.genero && especialidad.genero?.id === user.genero) {
        return especialidad;
      }

      return
    })

    return filtrado.map((especialidad) => ({
      text: especialidad.especialidad,
      value: especialidad.id.toString(),
    }))
    
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
      setImagen(filePath);
    }
  };

  const validator = yup.object().shape({
    nombre: yup
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .required("El nombre es requerido"),
    apellido: yup
      .string()
      .min(3, "El apellido debe tener al menos 3 caracteres")
      .required("El apellido es requerido"),
    telefono: yup
      .string()
      .matches(/^04[0-9]{1,10}$/, "El Número de Teléfono es inválido")
      .min(11, "El teléfono debe tener al menos 11 caracteres")
      .max(11, "El teléfono debe tener máximo 11 caracteres")
      .required("El teléfono es requerido"),
    institucion: yup
      .string()
      .min(3, "La institución debe tener al menos 3 caracteres")
      .required("La institución es requerida"),
    especialidad: yup
      .number()
      .min(1, "La especialidad es requerida")
      .required("La especialidad es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      especialidad: null,
      telefono: "",
      institucion: "",
    },
    onSubmit: (values) => {
      const addmedicoRequest = async () => {
        try {
          let result: Medico = await addMedico(values, token);
          if (imagen !== avatarPlaceholder) {
            result = JSON.parse(
              (
                await FileSystem.uploadAsync(
                  `https://backend-medics.vercel.app/api/medicos/${result.id}/`,
                  imagen,
                  {
                    fieldName: "foto",
                    httpMethod: "PATCH",
                    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                    headers: {
                      "Content-Type": "multipart/form-data",
                      Authorization: `Token ${token}`,
                    },
                  }
                )
              ).body
            );
          }

          addMedicoStore(result);
          formik.resetForm();
          formik.setSubmitting(false);
          setOpen(!open);
        } catch (error: any) {
          let errors = error.response.data;
          formik.setSubmitting(false);
          Object.keys(errors).forEach((key) => {
            formik.setFieldError(key, errors[key]);
          });
        }
      };

      addmedicoRequest();
    },
    validationSchema: validator,
  });

  return (
    <FormModal open={open} setOpen={setOpen} snapPoints={[70, 70]}>
      <H3>Agregar Nuevo Médico</H3>
      <Form gap={"$3"} paddingHorizontal="$3">
        <YStack gap={"$3"} alignItems="center">
          <Avatar onPress={selectAavatar} size={"$10"} circular>
            <Avatar.Image src={imagen} />
          </Avatar>
          <ContainerX flex={1} justifyContent="space-between" gap="$3">
            <Input
              id="name"
              label="Nombre"
              placeholder="Ingrese Nombre"
              flex={2}
              value={formik.values.nombre}
              onChangeText={(text) => formik.setFieldValue("nombre", text)}
              isValid={
                formik.touched.nombre
                  ? formik.errors.nombre === undefined
                    ? undefined
                    : false
                  : undefined
              }
              errorMessage={formik.touched.nombre ? formik.errors.nombre : undefined}
              disabled={formik.isSubmitting}
            />
            <Input
              id="lastname"
              label="Apellido"
              placeholder="Ingrese Apellido"
              flex={2}
              value={formik.values.apellido}
              onChangeText={(text) => formik.setFieldValue("apellido", text)}
              isValid={
                formik.touched.apellido
                  ? formik.errors.apellido === undefined
                    ? undefined
                    : false
                  : undefined
              }
              errorMessage={formik.touched.apellido ? formik.errors.apellido : undefined}
              disabled={formik.isSubmitting}
            />
          </ContainerX>

          <YStack width={"100%"} gap={"$3"}>
            <SelectC
              items={selectList}
              label="Especialidad"
              placeholder="Seleccione Especialidad"
              onValueChange={(value) =>
                formik.setFieldValue("especialidad", parseInt(value))
              }
              errorMessage={formik.touched.especialidad ? formik.errors.especialidad : undefined}
              isValid={
                formik.touched.especialidad
                  ? formik.errors.especialidad === undefined
                    ? undefined
                    : false
                  : undefined
              }
              disabled={formik.isSubmitting}
            />

            <Input
              id="phone"
              label="Número de Teléfono"
              placeholder="Ingrese Número Telefónico del Medico"
              flex={1}
              value={formik.values.telefono}
              onChangeText={(text) => formik.setFieldValue("telefono", text)}
              isValid={
                formik.touched.telefono
                  ? formik.errors.telefono === undefined
                    ? undefined
                    : false
                  : undefined
              }
              errorMessage={formik.touched.telefono ? formik.errors.telefono : undefined}
              disabled={formik.isSubmitting}
            />
            <Input
              id="institucion"
              label="Institución"
              placeholder="Ingrese Institucion"
              flex={1}
              value={formik.values.institucion}
              onChangeText={(text) => formik.setFieldValue("institucion", text)}
              isValid={
                formik.touched.institucion
                  ? formik.errors.institucion === undefined
                    ? undefined
                    : false
                  : undefined
              }
              errorMessage={formik.touched.institucion ? formik.errors.institucion : undefined}
              disabled={formik.isSubmitting}
            />
          </YStack>
        </YStack>
        <Form.Trigger>
          <CustomButton
            text="Guardar"
            disabled={formik.isSubmitting}
            onPress={() => {formik.handleSubmit()}}
          />
        </Form.Trigger>
      </Form>
    </FormModal>
  );
};
