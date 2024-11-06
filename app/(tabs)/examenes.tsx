import React from "react";
import { H2, Spinner, Stack} from "tamagui";
import { Container } from "@/components/bases/layouts";

import { Examen } from "@/types";
import { useExamenesStore } from "@/stores";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ExamDataListItem from "@/components/infoComponents/examenes/ExamDataListItem";
import AddExamFormModal from "@/components/addForms/addExamFormModal";
import { SearchInput } from "@/components/bases/SearchInput";
import { FlashList } from "@shopify/flash-list";
import DialogInstance from "@/components/bases/Dialog";

export default function Examenes() {
  const { examenes } = useExamenesStore();
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState<Examen[]>([]);
  const [search, setSearch] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: Examen }) => {
    return <ExamDataListItem exam={item} key={item.id} />;
  };

  const searchItemsF = async () => {
    setLoading(true);

    if (search === "") {
      setItems(examenes);
      setLoading(false);
      return;
    }
    const result = items.filter((item) => {
      const titulo = item.titulo.toLowerCase();
      const categoria = item.categoria.categoria.toLowerCase();
      const fecha = item.create_at.split("T")[0].toLowerCase(); // suponiendo que la fecha es un string en formato YYYY-MM-DD
      return (
        titulo.includes(search.toLowerCase()) ||
        categoria.includes(search.toLowerCase()) ||
        fecha.includes(search.toLowerCase())
      );
    });

    setItems(result);
    setTimeout(() => setLoading(false), 3000);
    return;
  };

  React.useMemo(() => {
    if (search === "") {
      setItems(examenes);
    }
  }, [search]);

  React.useEffect(() => {
    const loadItems = async () => {
      setItems(examenes);
    }

    loadItems().finally(() => setLoading(false));
  }, [examenes]);

  if (loading) {
    return <Stack><Spinner  /></Stack>;
  }

  return (
    <Container
      paddingBottom={insets.bottom + 90}
      paddingTop={"$4"}
      paddingHorizontal="$4"
    >
      <Stack flex={1} width={"100%"} height={"100%"}>
        <FlashList
          data={items}
          estimatedItemSize={100}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onRefresh={() => searchItemsF()}
          refreshing={loading}
          ListHeaderComponent={
            <SearchInput
              search={search}
              setSearch={setSearch}
              searchItemsF={searchItemsF}
            />
          }
          ListEmptyComponent={
            <H2>No hay nada aqui...</H2>
          }
        />
      </Stack>

      <DialogInstance
        title="Opciones de Exámenes"
        buttonText1="Agregar"
        buttonText2="Generar Reporte(ultimos 7 dias)"
        buttonAction1={() => setOpenModal(!openModal)}
        buttonAction2={() => console.log("generar")}
      />
      <AddExamFormModal open={openModal} setOpen={setOpenModal} />
    </Container>
  );
}
