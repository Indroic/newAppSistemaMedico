import React from "react";
import FormModal from "../bases/AddFormModal";
import { Form, H3, YStack } from "tamagui";
import Input from "../bases/Input";
import SelectC from "../bases/SelectC";
import CustomButton from "../bases/CustomButton";
import { useAuthStore, useMedicosStore } from "@/stores";
import * as yup from "yup";
import * as FileSystem from "expo-file-system";
import { useFormik } from "formik";
import { Consulta } from "@/types";
import { addConsulta } from "@/axios";
import TextArea from "../bases/TextArea";

export default (props: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { medicos, addConsulta: addConsultaStore } = useMedicosStore();
  const { token, user } = useAuthStore();

  const selectList = React.useMemo(() => {
    return medicos.map((medico) => ({
      text: medico.nombre,
      value: medico.id.toString(),
    }));
  }, [medicos]);

  const cacheAvatar = async (uri: string) => {
    const cacheDirectory = FileSystem.cacheDirectory;
    const fileName = uri.split("/").pop();
    const filePath = `${cacheDirectory}${fileName}`;
    await FileSystem.copyAsync({ from: uri, to: filePath });
    return filePath;
  };

  const validator = yup.object().shape({
    medico: yup
      .string()
      .required("El Médico es requerido"),
    diagnostico: yup
      .string()
      .min(3, "El apellido debe tener al menos 3 caracteres")
      .required("El apellido es requerido"),
    tratamiento: yup
      .string()
      .min(3, "El apellido debe tener al menos 3 caracteres")
      .required("El apellido es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      medico: "",
      diagnostico: "",
      tratamiento: "",
      usuario: user?.id,
    },
    onSubmit: (values) => {
      const addmedicoRequest = async () => {
        try {
          let result: Consulta = await addConsulta(values, token);

          addConsultaStore(result);
          formik.resetForm();
          formik.setSubmitting(false);
          props.setOpen(!props.open);
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
    <FormModal open={props.open} setOpen={props.setOpen} snapPoints={[55, 55]}>
      <H3>Agregar Nueva Consulta</H3>
      <Form gap={"$3"} paddingHorizontal="$3">
        <YStack width={"100%"} gap={"$3"}>
          <SelectC
            items={selectList}
            label="Médico"
            placeholder="Seleccione Médico"
            onValueChange={(value) => formik.setFieldValue("medico", value)}
            errorMessage={formik.errors.medico}
            isValid={
              formik.errors.medico !== undefined
                ? formik.errors.medico
                  ? false
                  : true
                : formik.values.medico
                ? true
                : undefined
            }
            disabled={formik.isSubmitting}
          />
          <TextArea
            label="Diagnóstico"
            value={formik.values.diagnostico}
            placeholder="Ingrese Diagnostico"
            onChangeText={(text) => formik.setFieldValue("diagnostico", text)}
            isValid={
              formik.touched.diagnostico
                ? formik.errors.diagnostico === undefined
                  ? undefined
                  : false
                : undefined
            }
            errorMessage={
              formik.touched.diagnostico ? formik.errors.diagnostico : undefined
            }
            disabled={formik.isSubmitting}
          />
          <TextArea
            label="Tratamiento"
            value={formik.values.tratamiento}
            placeholder="Ingrese Tratamiento"
            onChangeText={(text) => formik.setFieldValue("tratamiento", text)}
            isValid={
              formik.touched.tratamiento
                ? formik.errors.tratamiento === undefined
                  ? undefined
                  : false
                : undefined
            }
            errorMessage={
              formik.touched.tratamiento ? formik.errors.tratamiento : undefined
            }
            disabled={formik.isSubmitting}
          />
        </YStack>
        <Form.Trigger>
          <CustomButton
            text="Guardar"
            disabled={formik.isSubmitting}
            onPress={() => {
              formik.handleSubmit();
            }}
          />
        </Form.Trigger>
      </Form>
    </FormModal>
  );
};
