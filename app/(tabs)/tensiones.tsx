import React from "react";
import { H2, Spinner, Stack } from "tamagui";
import { Container } from "@/components/bases/layouts";

import { Tension } from "@/types";
import { useAuthStore, useMedicosStore } from "@/stores";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import TensionDataListItem from "@/components/infoComponents/tensiones/TensionDataListItem";
import AddTensionFormModal from "@/components/addForms/AddTensionFormModal";
import { SearchInput } from "@/components/bases/SearchInput";
import { FlashList } from "@shopify/flash-list";
import DialogInstance from "@/components/bases/Dialog";
import { generateReport } from "@/utils/reports";

export default function Tensiones() {
  const { tensiones } = useMedicosStore();
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState<Tension[]>([]);
  const [search, setSearch] = React.useState("");
  const insets = useSafeAreaInsets();
  const [openModal, setOpenModal] = React.useState(false);
  const { token } = useAuthStore();

  const renderItem = ({ item }: { item: Tension }) => {
    return <TensionDataListItem tension={item} key={item.id} />;
  };

  const searchItemsF = async () => {
    setLoading(true);

    if (search === "") {
      setItems(tensiones);
      setLoading(false);
      return;
    }
    const result = items.filter((item) => {
      const fecha = item.create_at.split("T")[0].toLowerCase(); //suponiendo que la fecha es un string en formato YYYY-MM-DD
      return fecha.includes(search.toLowerCase());
    });

    setItems(result);
    setLoading(false);
    return;
  };

  React.useEffect(() => {
    const loadItems = async () => {
      setItems(tensiones);
    };

    loadItems().finally(() => setTimeout(() => setLoading(false), 3000));
  }, [tensiones]);

  React.useMemo(() => {
    if (search === "") {
      setItems(tensiones);
    }
  }, [search]);

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
        title="Opciones de Tensiones"
        buttonText1="Agregar"
        buttonText2="Generar Reporte(Dia Actual)"
        buttonAction1={() => setOpenModal(!openModal)}
        buttonAction2={() => {
          generateReport({data: tensiones}, token)
        }}
      />

      <AddTensionFormModal open={openModal} setOpen={setOpenModal} />
    </Container>
  );
}
