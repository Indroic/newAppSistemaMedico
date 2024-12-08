import React from "react";
import { H1, Text, Button, Form, YStack, H4, Image, H2 } from "tamagui";
import { Container } from "@/components/bases/layouts";
import Input from "@/components/bases/Input";
import { Link, router } from "expo-router";

import * as SplashScreen from "expo-splash-screen";
import CustomButton from "@/components/bases/CustomButton";

import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "./context/AuthContext";

SplashScreen.preventAutoHideAsync();
export default function MedicosScreen() {
  const { onLogin } = useAuth();

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .matches(/^[^\s]+$/, "No se permiten espacios")
      .required("Este campo es obligatorio"),
    password: yup
      .string()
      .matches(/^[^\s]+$/, "No se permiten espacios")
      .min(8, "Debe de Tener al Menos 8 Caracteres")
      .required("Este campo es obligatorio"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      const login = async () => {
        const result = await onLogin(values.username, values.password);

        if (result.error) {
          formik.setFieldError("username", "Credenciales Invalidas");
          formik.setFieldError("password", "Credenciales Invalidas");
          formik.setSubmitting(false);
          return;
        }
        formik.setSubmitting(false);
        return router.replace("/(tabs)/");
      };
      login();
    },
    validationSchema: validationSchema,
  });

  return (
    <Container gap={20}>
      <Image width={"$10"} height={"$10"} source={require("../assets/images/icon-rounded.png")}></Image>
      <H1>Medit Kit P</H1>
      <H2>Inicie Sesión</H2>
      <Form
        onSubmit={() => formik.handleSubmit()}
        width={"100%"}
        paddingHorizontal={"$4"}
        gap={30}
      >
        <YStack gap={10}>
          <Input
            label="Usuario"
            placeholder="Ingresa tu usuario"
            onChangeText={(value) => {
              formik.setFieldValue("username", value);
            }}
            errorMessage={
              formik.touched.username ? formik.errors.username : undefined
            }
            value={formik.values.username}
            isValid={
              formik.touched.username
                ? formik.errors.username === undefined
                  ? undefined
                  : false
                : undefined
            }
            disabled={formik.isSubmitting}
          />
          <Input
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            isPassword
            onChangeText={(value) => {
              formik.setFieldValue("password", value);
            }}
            errorMessage={
              formik.touched.password ? formik.errors.password : undefined
            }
            value={formik.values.password}
            isValid={
              formik.touched.password
                ? formik.errors.password === undefined
                  ? undefined
                  : false
                : undefined
            }
            disabled={formik.isSubmitting}
          />
        </YStack>
        <Form.Trigger>
          <CustomButton
            disabled={formik.isSubmitting}
            onPress={() => formik.handleSubmit()}
            text="Iniciar Sesion"
          />
        </Form.Trigger>
        <YStack
          width={"100%"}
          gap={10}
          justifyContent="center"
          alignItems="center"
        >
          <Text>o</Text>
          <Link href={"/register"} disabled={formik.isSubmitting} asChild>
            <H4 tag="a" color={"$accentColor"}>
              Registrese
            </H4>
          </Link>
        </YStack>
      </Form>
    </Container>
  );
}
