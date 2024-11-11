import React from "react";
import { H2, Spinner, Stack} from "tamagui";
import { Container } from "@/components/bases/layouts";

import { Consulta } from "@/types";
import { useAuthStore, useMedicosStore } from "@/stores";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AddConsultaFormModal from "@/components/addForms/AddConsultaFormModal";
import ConsultaDataListItem from "@/components/infoComponents/consultas/ConsultaDataListItem";
import { SearchInput } from "@/components/bases/SearchInput";
import { FlashList } from "@shopify/flash-list";
import DialogInstance from "@/components/bases/Dialog";
import { generateReport } from "@/utils/reports";

export default function Consultas() {
  const { consultas } = useMedicosStore();
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState<Consulta[]>([]);
  const [search, setSearch] = React.useState("");
  const insets = useSafeAreaInsets();
  const [openModal, setOpenModal] = React.useState(false);
  const { token } = useAuthStore();

  const renderItem = ({ item }: { item: Consulta }) => {
    return <ConsultaDataListItem consulta={item} key={item.id} />;
  };

  const searchItemsF = async () => {
    setLoading(true);

    if (search === "") {
      setLoading(false);
      return;
    }

    const result = items.filter((item) => {
      const medico_nombre = item.medico.nombre.toLowerCase();
      const medico_apellido = item.medico.apellido.toLowerCase();
      const especialidad = item.medico.especialidad.especialidad.toLowerCase();
      const fecha = item.create_at.split("T")[0].toLowerCase(); // suponiendo que la fecha es un string en formato YYYY-MM-DD

      const searchLower = search.toLowerCase();

      return (
        medico_nombre.includes(searchLower) ||
        medico_apellido.includes(searchLower) ||
        especialidad.includes(searchLower) ||
        fecha.includes(searchLower)
      );
    });

    setItems(result);
    setTimeout(() => setLoading(false), 3000);
    return;
  };

  React.useEffect(() => {
    const loadItems = async () => {
      setItems(consultas);
    };
    loadItems().finally(() => setLoading(false));
  }, [consultas]);

  React.useMemo(() => {
    if (search === "") {
      setItems(consultas);
    }
  }, [search]);

  if (loading) {
    return <Stack><Spinner  /></Stack>;
  }

  return (
    <Container
      paddingBottom={insets.bottom + 90}
      paddingTop={"$4"}
      paddingHorizontal={"$4"}
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
        title="Opciones de Consultas"
        buttonText1="Agregar"
        buttonText2="Generar Reporte(ultimos 7 dias)"
        buttonAction1={() => setOpenModal(!openModal)}
        buttonAction2={() => {
          generateReport({data: consultas}, token)
        }}
      />

      <AddConsultaFormModal open={openModal} setOpen={setOpenModal} />
    </Container>
  );
}
