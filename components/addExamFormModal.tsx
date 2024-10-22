import React from "react";
import FormModal from "./AddFormModal";
import { Form, H3, Text, YStack } from "tamagui";
import Input from "./Input";
import SelectC from "./SelectC";
import { Upload } from "@tamagui/lucide-icons";
import CustomButton from "./CustomButton";
import { useAuthStore, useExamenesStore } from "@/stores";
import { useFormik } from "formik";
import { useAuth } from "@/app/context/AuthContext";
import * as DocumentPicker from "expo-document-picker";
import * as yup from "yup";
import * as FileSystem from "expo-file-system";
import { addExamen } from "@/axios";
import { Examen } from "@/types";
import TextArea from "./TextArea";

export default () => {
  const { token, user } = useAuthStore();
  const { categorias, addExamen: addExamenStore } = useExamenesStore();
  const [selectFileName, setSelectFileName] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const selectList = React.useMemo(() => {
    return categorias.map((categoria) => {
      return { value: categoria.id, text: categoria.categoria };
    });
  }, [categorias]);

  const validator = yup.object().shape({
    titulo: yup.string().required("El nombre es requerido"),
    categoria: yup.string().required("La categoria es requerida"),
    descripcion: yup.string().required("La descripción es requerida"),
    archivo: yup.string().required("El archivo es requerido"),
  });

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
      formik.setErrors({archivo: ""});
      setSelectFileName(filename);

      formik.setFieldValue("archivo", result.assets[0].uri);

      return;
    }

    return;
  };

  const formik = useFormik({
    initialValues: {
      titulo: "",
      categoria: null,
      archivo: selectFileName,
      descripcion: "",
      agregado_por: user?.id ?? "",
    },
    onSubmit: (values) => {
      const addExamenRequest = async () => {
        try {
          let result: Examen = await addExamen(
            {
              titulo: values.titulo,
              categoria: values.categoria,
              descripcion: values.descripcion,
              agregado_por: values.agregado_por,
            },
            token ?? ""
          );

          result = JSON.parse(
            (
              await FileSystem.uploadAsync(
                "https://backend-medics.vercel.app/api/examenes/" +
                  result.id +
                  "/",
                values.archivo ?? "",
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

          formik.resetForm();
          formik.setSubmitting(false);
          setOpen(!open);
          addExamenStore(result);
        } catch (error: any) {
          let errors = error.response.data;
          Object.keys(errors).forEach((key) => {
            formik.setFieldError(key, errors[key]);
          });
        }
      };

      addExamenRequest();
    },
    validationSchema: validator,
  });

  return (
    <FormModal open={open} setOpen={setOpen}>
      <H3>Agregar Nuevo Examen</H3>
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
            placeholder="Seleccione Categoria"
            onValueChange={(value) =>
              formik.setFieldValue("categoria", parseInt(value))
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
            onChangeText={(text) => formik.setFieldValue("descripcion", text)}
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
              <Text color="green">{selectFileName}</Text>
            )}
          </YStack>

          <CustomButton text="Guardar" onPress={() => formik.handleSubmit()} disabled={formik.isSubmitting} />
        </YStack>
      </Form>
    </FormModal>
  );
};
