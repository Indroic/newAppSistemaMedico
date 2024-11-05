import React from "react";
import { H2, Stack} from "tamagui";
import { Container } from "@/components/bases/layouts";

import { Consulta } from "@/types";
import { useMedicosStore } from "@/stores";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AddConsultaFormModal from "@/components/addForms/AddConsultaFormModal";
import ConsultaDataListItem from "@/components/infoComponents/consultas/ConsultaDataListItem";
import { SearchInput } from "@/components/bases/SearchInput";
import { FlashList } from "@shopify/flash-list";

export default function Medicos() {
  const { consultas } = useMedicosStore();
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState<Consulta[]>([]);
  const [search, setSearch] = React.useState("");
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: Consulta }) => {
    return <ConsultaDataListItem consulta={item} key={item.id} />;
  };

  const searchItemsF = () => {
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

    loadItems().finally(() => setTimeout(() => setLoading(false), 3000));
  }, [consultas]);

  React.useMemo(() => {
    if (search === "") {
      setItems(consultas);
    }
  }, [search]);

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

      <AddConsultaFormModal />
    </Container>
  );
}
