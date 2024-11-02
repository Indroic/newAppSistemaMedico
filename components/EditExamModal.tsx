import { Pencil, Upload } from "@tamagui/lucide-icons";
import React from "react";
import {
  Button,
  Form,
  H3,
  Sheet,
  Text,
  XStack,
  YStack,
} from "tamagui";
import Input from "./Input";
import { Examen } from "@/types";
import { useAuthStore, useExamenesStore } from "@/stores";
import SelectC from "./SelectC";
import XButton from "./XButton";
import * as yup from "yup";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { useFormik } from "formik";
import { updateExamen} from "@/axios";
import CustomButton from "./CustomButton";
import TextArea from "./TextArea";

export default (props: { exam: Examen }) => {
  const [open, setOpen] = React.useState(false);
  const [selectFileName, setSelectFileName] = React.useState<string>(props.exam.archivo);
  const { token } = useAuthStore();
  const { categorias, updateExamen: updateExamenStore } = useExamenesStore();

  const selectList = React.useMemo(() => {
    return categorias.map((categoria) => {
      return { value: categoria.id, text: categoria.categoria };
    });
  }, [categorias]);

  const selectFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: "application/*",
      multiple: false,
    });

    if (!result.canceled) {
      let filename = result.assets[0].name;
      if ((result.assets[0].size ?? 0 / (1024 * 1024) > 1.8) === true) {
        formik.setErrors({
          archivo: "El archivo es demasiado grande",
        });

        return;
      }
      formik.setErrors({ archivo: "" });
      setSelectFileName(filename);

      formik.setFieldValue("archivo", result.assets[0].uri);

      return;
    }

    return;
  };

  const validator = yup.object().shape({
    titulo: yup.string().required("El nombre es requerido"),
    categoria: yup.string().required("La categoria es requerida"),
    descripcion: yup.string().required("La descripción es requerida"),
    archivo: yup.string().required("El archivo es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      titulo: props.exam.titulo,
      categoria: props.exam.categoria.id,
      archivo: selectFileName,
      descripcion: props.exam.descripcion,
    },
    onSubmit: (values) => {
      const updateExamenRequest = async () => {
        try {
          let result: Examen = await updateExamen(
            props.exam.id,
            {
              titulo: values.titulo,
              categoria: values.categoria,
              descripcion: values.descripcion,
            },
            token
          );
          console.log(result);

          if (selectFileName !== props.exam.archivo) {
            let a = JSON.parse(
              (
                await FileSystem.uploadAsync(
                  "https://backend-medics.vercel.app/api/examenes/" +
                    props.exam.id +
                    "/",
                  values.archivo,
                  {
                    fieldName: "archivo",
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

            let newExam = {
              ...a,
            };

            updateExamenStore(newExam);
            
            setOpen(false);
            return;
          }
          let newExam = {
            ...result,
          };

          updateExamenStore(newExam);
          formik.setSubmitting(false);
          setOpen(false);
          return;
        } catch (error: any) {
          let errors = error.response.data;
          Object.keys(errors).forEach((key) => {
            formik.setFieldError(key, errors[key]);
          });
        }
      };

      updateExamenRequest();
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
            <H3>Editar Examen</H3>
            <Form paddingHorizontal="$4">
              <YStack gap={"$3"}>
                <Input
                  label="Título"
                  placeholder="Ingrese Título"
                  flex={2}
                  value={formik.values.titulo}
                  onChangeText={(text) => formik.setFieldValue("titulo", text)}
                  errorMessage={formik.errors.titulo}
                  isValid={
                    formik.errors.titulo !== undefined
                      ? formik.errors.titulo
                        ? false
                        : true
                      : formik.values.titulo
                      ? true
                      : undefined
                  }
                  disabled={formik.isSubmitting}
                />

                <SelectC
                  items={selectList}
                  label="Categoria"
                  placeholder={props.exam.categoria.categoria}
                  onValueChange={(value) =>
                    formik.setFieldValue("categoria", value)
                  }
                  errorMessage={formik.errors.categoria}
                  isValid={
                    formik.errors.categoria !== undefined
                      ? formik.errors.categoria
                        ? false
                        : true
                      : formik.values.categoria
                      ? true
                      : undefined
                  }
                  disabled={formik.isSubmitting}
                />

                <TextArea
                  id="Descripción"
                  label="Descripción"
                  placeholder="Ingrese Descripción"
                  flex={1}
                  value={formik.values.descripcion}
                  onChangeText={(text) =>
                    formik.setFieldValue("descripcion", text)
                  }
                  isValid={
                    formik.errors.descripcion !== undefined
                      ? formik.errors.descripcion
                        ? false
                        : true
                      : formik.values.descripcion
                      ? true
                      : undefined
                  }
                  errorMessage={formik.errors.descripcion}
                  disabled={formik.isSubmitting}
                />

                <YStack
                  justifyContent="center"
                  alignItems="center"
                  padding="$10"
                  backgroundColor={"$color2"}
                  borderColor={
                    formik.errors.archivo !== undefined
                      ? formik.errors.archivo
                        ? "red"
                        : "green"
                      : formik.values.archivo
                      ? "green"
                      : "$borderColor"
                  }
                  borderWidth={2}
                  borderRadius={"$4"}
                  borderStyle={"dashed"}
                  gap={"$2"}
                  onPress={() => selectFile()}
                  disabled={formik.isSubmitting}
                  disabledStyle={{ opacity: 0.5 }}
                >
                  <Upload
                    size={"$5"}
                    color={
                      formik.errors.archivo !== undefined
                        ? formik.errors.archivo
                          ? "red"
                          : "green"
                        : formik.values.archivo
                        ? "green"
                        : "$color10"
                    }
                  />
                  <Text
                    color={
                      formik.errors.archivo !== undefined
                        ? formik.errors.archivo
                          ? "red"
                          : "green"
                        : formik.values.archivo
                        ? "green"
                        : "$color10"
                    }
                  >
                    Subir Archivo
                  </Text>
                  {formik.errors.archivo && (
                    <Text color="red">{formik.errors.archivo}</Text>
                  )}
                  {formik.values.archivo && (
                    <Text color="green">{selectFileName.split("/").pop()}</Text>
                  )}
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
