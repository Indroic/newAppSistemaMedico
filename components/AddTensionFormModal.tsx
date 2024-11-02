import React from "react";
import FormModal from "./AddFormModal";
import { Form, H3, YStack } from "tamagui";
import Input from "./Input";
import CustomButton from "./CustomButton";
import { useAuthStore, useMedicosStore } from "@/stores";
import { useFormik } from "formik";

import * as yup from "yup";

import { addTension } from "@/axios";
import { Tension } from "@/types";

export default () => {
  const { token, user } = useAuthStore();
  const { addTension: addTensionStore } = useMedicosStore();
  const [open, setOpen] = React.useState(false);

  const validator = yup.object().shape({
    sistolic: yup.number().required("La presión sistólica es requerida"),
    diastolic: yup.number().required("La presión diastólica es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      sistolic: "",
      diastolic: "",
      usuario: user.id,
    },
    onSubmit: (values) => {
      const addExamenRequest = async () => {
        try {
          let result: Tension = await addTension(
            {
              ...values,
            },
            token
          );
          formik.resetForm();
          formik.setSubmitting(false);
          setOpen(!open);
          addTensionStore(result);
        } catch (error: any) {
          console.log(error);
          let errors = error.response.data;
          Object.keys(errors).forEach((key) => {
            formik.setFieldError(key, errors[key]);
          });

          formik.setSubmitting(false);
        }
      };

      addExamenRequest();
    },
    validationSchema: validator,
  });

  return (
    <FormModal open={open} setOpen={setOpen}>
      <H3>Agregar Nuevo Registro de Tensión</H3>
      <Form paddingHorizontal="$4">
        <YStack gap={"$3"}>
          <Input
            label="Sistólica"
            placeholder="Ingrese su presión sistolica"
            flex={2}
            value={formik.values.sistolic}
            onChangeText={(text) => formik.setFieldValue("sistolic", text)}
            errorMessage={formik.touched.sistolic ? formik.errors.sistolic : undefined}
            isValid={
              formik.touched.sistolic
                ? formik.errors.sistolic === undefined
                  ? undefined
                  : false
                : undefined
            }
            disabled={formik.isSubmitting}
          />

          <Input
            label="Diatósica"
            placeholder="Ingrese su presion diastolica"
            flex={2}
            value={formik.values.diastolic}
            onChangeText={(text) => formik.setFieldValue("diastolic", text)}
            errorMessage={formik.touched.diastolic ? formik.errors.diastolic : undefined}
            isValid={
              formik.touched.diastolic
                ? formik.errors.diastolic === undefined
                  ? undefined
                  : false
                : undefined
            }
            disabled={formik.isSubmitting}
          />

          <CustomButton
            text="Guardar"
            onPress={() => formik.handleSubmit()}
            disabled={formik.isSubmitting}
          />
        </YStack>
      </Form>
    </FormModal>
  );
};
