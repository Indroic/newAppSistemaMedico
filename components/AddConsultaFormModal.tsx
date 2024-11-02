import React from "react";
import FormModal from "./AddFormModal";
import { Avatar, Form, H3, YStack } from "tamagui";
import { ContainerX } from "./layouts";
import Input from "./Input";
import SelectC from "./SelectC";
import CustomButton from "./CustomButton";
import { useAuthStore, useMedicosStore, useMicelaneusStore } from "@/stores";
import * as yup from "yup";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useFormik } from "formik";
import { Medico } from "@/types";
import { addConsulta, addMedico } from "@/axios";

export default () => {
  const { avatarPlaceholder } = useMicelaneusStore();
  const [imagen, setImagen] = React.useState<string>(avatarPlaceholder);
  const [open, setOpen] = React.useState(false);
  const { addMedico: addMedicoStore, medicos } = useMedicosStore();
  const { token, user } = useAuthStore();

  const selectList = React.useMemo(() => {
    return medicos.map((medico) => ({
      text: medico.nombre,
      value: medico.id.toString(),
    }))
    
  }, [medicos]);

  const cacheAvatar = async (uri: string) => {
    const cacheDirectory = FileSystem.cacheDirectory;
    const fileName = uri.split("/").pop();
    const filePath = `${cacheDirectory}${fileName}`;
    await FileSystem.copyAsync({ from: uri, to: filePath });
    return filePath;
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
          let result: Medico = await addConsulta(values, token);

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
    <FormModal open={open} setOpen={setOpen}>
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
            />
            <Input
              id="lastname"
              label="Apellido"
              placeholder="Ingrese Apellido"
              flex={2}
              value={formik.values.apellido}
              onChangeText={(text) => formik.setFieldValue("apellido", text)}
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
              id="phone"
              label="Número de Teléfono"
              placeholder="Ingrese Número Telefónico del Medico"
              flex={1}
              value={formik.values.telefono}
              onChangeText={(text) => formik.setFieldValue("telefono", text)}
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
            />
            <Input
              id="institucion"
              label="Institución"
              placeholder="Ingrese Institucion"
              flex={1}
              value={formik.values.institucion}
              onChangeText={(text) => formik.setFieldValue("institucion", text)}
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