import React from "react";
import { Text, H1, Form, YStack, H4, Button, XStack } from "tamagui";
import { Avatar } from "@tamagui/avatar";
import { Link, router } from "expo-router";
import { Container } from "@/components/layouts";
import Input from "@/components/Input";
import { ScrollView } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGeneroStore, useMicelaneusStore } from "@/stores";
import CustomButton from "@/components/CustomButton";
import * as yup from "yup";
import { useAuth } from "./context/AuthContext";
import { useFormik } from "formik";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import SelectC from "@/components/SelectC";

export default function MedicosScreen() {
  const insets = useSafeAreaInsets();
  const { onRegister } = useAuth();
  const { avatarPlaceholder } = useMicelaneusStore();
  const [avatar, setAvatar] = React.useState<string>(avatarPlaceholder);
  const { generos } = useGeneroStore();

  const cacheAvatar = async (uri: string) => {
    const cacheDirectory = FileSystem.cacheDirectory;
    const fileName = uri.split("/").pop();
    const filePath = `${cacheDirectory}${fileName}`;
    await FileSystem.copyAsync({ from: uri, to: filePath });
    return filePath;
  };

  const selectList = React.useMemo(() => {
    return generos.map((item) => {
      return {
        text: item.genero,
        value: item.id,
      };
    });
  }, [generos]);

  const selectAavatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [3, 4],
    });

    if (!result.canceled) {
      const filePath = await cacheAvatar(result.assets[0].uri);
      setAvatar(filePath);
      formik.setFieldValue("avatar", filePath);
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
    genero: yup.number().required("El genero es requerido"),
    telefono: yup
      .string()
      .matches(/^04[0-9]{1,10}$/, "El Número de Teléfono es inválido")
      .min(11, "El teléfono debe tener al menos 11 caracteres")
      .max(11, "El teléfono debe tener máximo 11 caracteres")
      .required("El teléfono es requerido"),
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
      genero: "",
      telefono: "",
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
          ci: values.ci,
          genero: values.genero,
          telefono: values.telefono,
        });
        if (result.error) {
          console.log(result.errors);
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
              errorMessage={
                formik.touched.first_name ? formik.errors.first_name : undefined
              }
              value={formik.values.first_name}
              isValid={
                formik.touched.first_name
                  ? formik.errors.first_name === undefined
                    ? undefined
                    : false
                  : undefined
              }
              disabled={formik.isSubmitting}
              onChangeText={(text) => formik.setFieldValue("first_name", text)}
            />
            <Input
              label="Apellido"
              placeholder="Ingresa tu Apellido"
              flex={1}
              errorMessage={
                formik.touched.last_name ? formik.errors.last_name : undefined
              }
              value={formik.values.last_name}
              isValid={
                formik.touched.last_name
                  ? formik.errors.last_name === undefined
                    ? undefined
                    : false
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
              onChangeText={(text) => formik.setFieldValue("username", text)}
            />
            <Input
              label="Cédula de Identidad"
              placeholder="Ingresa tu Cédula"
              errorMessage={formik.touched.ci ? formik.errors.ci : undefined}
              value={formik.values.ci}
              isValid={
                formik.touched.ci
                  ? formik.errors.ci === undefined
                    ? undefined
                    : false
                  : undefined
              }
              disabled={formik.isSubmitting}
              onChangeText={(text) => formik.setFieldValue("ci", text)}
            />
            <Input
              label="Correo Electrónico"
              placeholder="Ingresa tu Correo"
              disabled={formik.isSubmitting}
              errorMessage={
                formik.touched.email ? formik.errors.email : undefined
              }
              value={formik.values.email}
              isValid={
                formik.touched.email
                  ? formik.errors.email === undefined
                    ? undefined
                    : false
                  : undefined
              }
              onChangeText={(text) => formik.setFieldValue("email", text)}
            />
            <SelectC
              items={selectList}
              label="Género"
              placeholder="Seleccione su Género"
              onValueChange={(value) => formik.setFieldValue("genero", value)}
              errorMessage={
                formik.touched.genero ? formik.errors.genero : undefined
              }
              isValid={
                formik.touched.genero
                  ? formik.errors.genero === undefined
                    ? undefined
                    : false
                  : undefined
              }
              disabled={formik.isSubmitting}
            />
            <Input
              label="Número de Emergencia"
              placeholder="Ingrese un Numero de Emergencia"
              errorMessage={
                formik.touched.telefono ? formik.errors.telefono : undefined
              }
              value={formik.values.telefono}
              isValid={
                formik.touched.telefono
                  ? formik.errors.telefono === undefined
                    ? undefined
                    : false
                  : undefined
              }
              disabled={formik.isSubmitting}
              onChangeText={(text) => formik.setFieldValue("telefono", text)}
            />
            <Input
              label="Contraseña"
              isPassword={true}
              placeholder="Ingresa una Contraseña"
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
              onChangeText={(text) => formik.setFieldValue("password", text)}
            />
            <Input
              label="Confirmar Contraseña"
              isPassword={true}
              placeholder="Confirme la Contraseña"
              errorMessage={
                formik.touched.confirmPassword
                  ? formik.errors.confirmPassword
                  : undefined
              }
              value={formik.values.confirmPassword}
              isValid={
                formik.touched.confirmPassword
                  ? formik.errors.confirmPassword === undefined
                    ? undefined
                    : false
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
            <CustomButton
              text="Registrarse"
              onPress={() => formik.handleSubmit()}
              disabled={formik.isSubmitting}
            />
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
