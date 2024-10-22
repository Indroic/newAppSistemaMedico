import React from "react";
import { Text, H1, Form, YStack, H4, Button, XStack } from "tamagui";
import { Avatar } from "@tamagui/avatar";
import { Link, router } from "expo-router";
import { Container } from "@/components/layouts";
import Input from "@/components/Input";
import { ScrollView } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMicelaneusStore } from "@/stores";
import CustomButton from "@/components/CustomButton";
import * as yup from "yup";
import { useAuth } from "./context/AuthContext";
import { useFormik } from "formik";

import * as ImagePicker  from "expo-image-picker"
import * as FileSystem from "expo-file-system";

export default function MedicosScreen() {
  const insets = useSafeAreaInsets();
  const { onRegister } = useAuth();
  const { avatarPlaceholder } = useMicelaneusStore();
  const [avatar, setAvatar] = React.useState<string>(avatarPlaceholder);

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
    username: yup
      .string()
      .matches(/^[^\s]+$/, "No se permiten espacios")
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
      .required("El nombre de usuario es requerido"),
    password: yup
      .string()
      .matches(/^[^\s]+$/, "No se permiten espacios")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("La contraseña es requerida"),
    confirmPassword: yup
      .string()
      .matches(/^[^\s]+$/, "No se permiten espacios")
      .oneOf([yup.ref("password"), undefined], "Las contraseñas no coinciden")
      .required("La confirmación de la contraseña es requerida"),
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
      username: "",
      password: "",
      confirmPassword: "",
      avatar: avatar,
      first_name: "",
      last_name: "",
      email: "",
      ci: "",
    },
    onSubmit: (values) => {
      const register = async () => {
        const result = await onRegister({
          username: values.username,
          password: values.password,
          avatar: values.avatar,
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          ci: parseInt(values.ci),
        });
        if (result.error) {
          const errors = result.errors;
          Object.keys(errors).forEach((key) => {
            formik.setFieldError(key, errors[key]);
          });
          formik.setSubmitting(false);
          return;
        }
        formik.resetForm();
        formik.setSubmitting(false);
        return router.replace("/(tabs)/");
      };
      register();
    },
    validationSchema: validator,
  });

  return (
    <ScrollView>
      <Container
        paddingTop={insets.top + 40}
        paddingBottom={insets.bottom + 40}
        gap={20}
      >
        <H1>Registrese</H1>
        <Form width={"100%"} alignItems="center" paddingHorizontal={"$5"}>
          <Avatar circular size={"$10"} onPress={selectAavatar}>
            <Avatar.Image src={avatar} />
          </Avatar>

          <XStack gap={5} width={"100%"} justifyContent="space-between">
            <Input
              label="Nombre"
              placeholder="Ingresa tu Nombre"
              flex={1}
              errorMessage={formik.errors.first_name}
              value={formik.values.first_name}
              isValid={
                formik.errors.first_name !== undefined
                  ? formik.errors.first_name
                    ? false
                    : true
                  : formik.values.first_name
                  ? true
                  : undefined
              }
              disabled={formik.isSubmitting}
              onChangeText={(text) => formik.setFieldValue("first_name", text)}
            />
            <Input
              label="Apellido"
              placeholder="Ingresa tu Apellido"
              flex={1}
              errorMessage={formik.errors.last_name}
              value={formik.values.last_name}
              isValid={
                formik.errors.last_name !== undefined
                  ? formik.errors.last_name
                    ? false
                    : true
                  : formik.values.last_name
                  ? true
                  : undefined
              }
              disabled={formik.isSubmitting}
              onChangeText={(text) => formik.setFieldValue("last_name", text)}
            />
          </XStack>

          <YStack width={"100%"}>
            <Input
              label="Usuario"
              placeholder="Ingresa un Nombre de Usuario"
              errorMessage={formik.errors.username}
              value={formik.values.username}
              isValid={
                formik.errors.username !== undefined
                  ? formik.errors.username
                    ? false
                    : true
                  : formik.values.username
                  ? true
                  : undefined
              }
              disabled={formik.isSubmitting}
              onChangeText={(text) => formik.setFieldValue("username", text)}
            />
            <Input
              label="Cédula de Identidad"
              placeholder="Ingresa tu Cédula"
              errorMessage={formik.errors.ci}
              value={formik.values.ci}
              isValid={
                formik.errors.ci !== undefined
                  ? formik.errors.ci
                    ? false
                    : true
                  : formik.values.ci
                  ? true
                  : undefined
              }
              disabled={formik.isSubmitting}
              onChangeText={(text) => formik.setFieldValue("ci", text)}
            />
            <Input
              label="Correo Electronico"
              placeholder="Ingresa tu Correo"
              disabled={formik.isSubmitting}
              errorMessage={formik.errors.email}
              value={formik.values.email}
              isValid={
                formik.errors.email !== undefined
                  ? formik.errors.email
                    ? false
                    : true
                  : formik.values.email
                  ? true
                  : undefined
              }
              onChangeText={(text) => formik.setFieldValue("email", text)}
            />
            <Input
              label="Contraseña"
              isPassword={true}
              placeholder="Ingresa una Contraseña"
              errorMessage={formik.errors.password}
              value={formik.values.password}
              isValid={
                formik.errors.password !== undefined
                  ? formik.errors.password
                    ? false
                    : true
                  : formik.values.password
                  ? true
                  : undefined
              }
              disabled={formik.isSubmitting}
              onChangeText={(text) => formik.setFieldValue("password", text)}
            />
            <Input
              label="Confirmar Contraseña"
              isPassword={true}
              placeholder="Confirme la Contraseña"
              errorMessage={formik.errors.confirmPassword}
              value={formik.values.confirmPassword}
              isValid={
                formik.errors.confirmPassword !== undefined
                  ? formik.errors.confirmPassword
                    ? false
                    : true
                  : formik.values.confirmPassword
                  ? true
                  : undefined
              }
              disabled={formik.isSubmitting}
              onChangeText={(text) =>
                formik.setFieldValue("confirmPassword", text)
              }
            />
          </YStack>

          <YStack
            marginTop={"$10"}
            gap={10}
            justifyContent="center"
            alignItems="center"
            width={"100%"}
          >
            <CustomButton text="Registrarse" onPress={() => formik.handleSubmit()} disabled={formik.isSubmitting} />
            <Text>o</Text>
            <Link href={"/"} asChild>
              <H4 tag="a" color={"$accentColor"}>
                Inicie Sesión
              </H4>
            </Link>
          </YStack>
        </Form>
      </Container>
    </ScrollView>
  );
}
