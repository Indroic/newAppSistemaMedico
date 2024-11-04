import React from "react";
import { Image, ScrollView, Stack, YStack } from "tamagui";
import { Container } from "@/components/bases/layouts";
import { FlashList } from "@shopify/flash-list";
import MedicDataListItem from "@/components/infoComponents/medicos/MedicDataListItem";
import { Medico } from "@/types";
import AddMedicFormModal from "@/components/addForms/AddMedicFormModal";
import { useMedicosStore } from "@/stores";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SearchInput } from "@/components/bases/SearchInput";

export default function Medicos() {
  const { medicos } = useMedicosStore();
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState<Medico[]>([]);
  const [search, setSearch] = React.useState("");
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: Medico }) => {
    return <MedicDataListItem medic={item} key={item.id} />;
  };

  const searchItemsF = () => {
    setLoading(true);

    if (search === "") {
      setItems(medicos);
      setLoading(false);
      return;
    }

    const result = items.filter((item) => {
      const nombre = item.nombre.toLowerCase();
      const especialidad = item.especialidad.especialidad.toLowerCase();
      const fecha = item.create_at.split("T")[0].toLowerCase(); // suponiendo que la fecha es un string en formato YYYY-MM-DD

      const searchLower = search.toLowerCase();

      return (
        nombre.includes(searchLower) ||
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
      setItems(medicos);
    };

    loadItems().finally(() => setTimeout(() => setLoading(false), 3000));
  }, [medicos]);

  React.useMemo(() => {
    if (search === "") {
      setItems(medicos);
    }
  }, [search]);

  if (loading) {
    <Image source={require("../../assets/images/search.gif")} />;
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
          ListEmptyComponent={<Image source={require("@/assets/images/not_found.png")} scale={0.5} />}
        />
      </Stack>

      <AddMedicFormModal />
    </Container>
  );
}
