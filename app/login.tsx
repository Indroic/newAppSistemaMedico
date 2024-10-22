import React from "react";
import { H1, Text, Button, Form, YStack, H4 } from "tamagui";
import { Container } from "@/components/layouts";
import Input from "@/components/Input";
import { Link, router } from "expo-router";
import { useFonts } from "expo-font";

import * as FileSystem from "expo-file-system";
import { useExamenesStore, useMedicosStore, useMicelaneusStore } from "@/stores";

import * as Network from "expo-network";
import * as SplashScreen from "expo-splash-screen";
import CustomButton from "@/components/CustomButton";

import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "./context/AuthContext";
import { getCategorias, getEspecialidades } from "@/axios";

SplashScreen.preventAutoHideAsync();
export default function MedicosScreen() {
  const [loading, setLoaded] = React.useState(true);

  const { setAvatarPlaceholder } = useMicelaneusStore();

  const { onLogin } = useAuth();

  const {setCategorias} = useExamenesStore();
  const {setEspecialidades} = useMedicosStore();

  const [fontsLoaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

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

  React.useEffect(() => {
    const downloadAvatarPlaceholder = async () => {
      let cacheDir = FileSystem.cacheDirectory;
      let AvatarPlaceholder = await FileSystem.downloadAsync(
        "https://rnkqnkvcketqhptlupct.supabase.co/storage/v1/object/public/storage-medics/avatars/avatar-placeholder.png",
        cacheDir + "avatar-placeholder.png"
      );

      setAvatarPlaceholder(AvatarPlaceholder.uri);

      return true;
    }
    
    const fetchEspecialidades = async () => {
      let especialidadesResponse = await getEspecialidades();
      if (especialidadesResponse) {
        setEspecialidades(especialidadesResponse);
      }
    }

    const fetchCategorias = async () =>{
      let categoriasResponse  = await getCategorias();
      if (categoriasResponse) {
        setCategorias(categoriasResponse);
      }
      
    }


    async function prepare() {
      try {
        await fetchEspecialidades();
        await fetchCategorias();
        
        let network = await Network.getNetworkStateAsync();
        let cacheAvatarPlaceholder = await FileSystem.getInfoAsync(
          FileSystem.cacheDirectory + "avatar-placeholder.png"
        );

        if (
          !cacheAvatarPlaceholder.exists &&
          network.isConnected &&
          network.isInternetReachable
        ) {
          downloadAvatarPlaceholder();
        } else {
          setAvatarPlaceholder(cacheAvatarPlaceholder.uri);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (fontsLoaded) {
          setLoaded(false);
          SplashScreen.hideAsync();
        }
      }
    }

    prepare();
  }, [fontsLoaded]);

  React.useCallback(async () => {
    if (loading) {
      await SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) {
    return null;
  }

  return (
    <Container gap={20}>
      <H1>Inicie Sesión</H1>
      <Form onSubmit={() => formik.handleSubmit()} width={"100%"} paddingHorizontal={"$4"} gap={30}>
        <YStack gap={10}>
          <Input
            label="Usuario"
            placeholder="Ingresa tu usuario"
            onChangeText={(value) => {
              formik.setFieldValue("username", value);
            }}
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
          />
          <Input
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            isPassword
            onChangeText={(value) => {
              formik.setFieldValue("password", value);
            }}
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
          />
        </YStack>
        <Form.Trigger>
          <CustomButton disabled={formik.isSubmitting} onPress={() => formik.handleSubmit()} text="Iniciar Sesion" />
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
