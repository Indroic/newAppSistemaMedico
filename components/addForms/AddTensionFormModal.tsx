import React from "react";
import FormModal from "../bases/AddFormModal";
import { Form, H3 } from "tamagui";
import Input from "../bases/Input";
import CustomButton from "../bases/CustomButton";
import { useAuthStore, useMedicosStore } from "@/stores";
import { useFormik } from "formik";

import * as yup from "yup";

import { addTension } from "@/axios";
import { Tension } from "@/types";
import { ContainerY } from "../bases/layouts";

export default (props: { open: boolean; setOpen: (open: boolean) => void }) => {
  const { token, user } = useAuthStore();
  const { addTension: addTensionStore } = useMedicosStore();

  const validator = yup.object().shape({
    sistolic: yup.number().positive().required("La presión sistólica es requerida"),
    diastolic: yup.number().positive().required("La presión diastólica es requerida"),
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
          props.setOpen(!props.open);
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
    <FormModal open={props.open} setOpen={props.setOpen} snapPoints={[40, 40]}>
      <H3>Agregar Nuevo Registro de Tensión</H3>
      <Form paddingHorizontal="$4">
        <ContainerY gap={"$3"}>
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
        </ContainerY>
      </Form>
    </FormModal>
  );
};
