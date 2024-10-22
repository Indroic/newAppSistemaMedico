import React from "react";
import { ScrollView } from "tamagui";
import { Container } from "@/components/layouts";

import MedicDataListItem from "@/components/MedicDataListItem";
import { Medico } from "@/types";
import AddMedicFormModal from "@/components/AddMedicFormModal";
import { useMedicosStore } from "@/stores";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Spinner } from "tamagui";
import Input from "@/components/Input";

export default function Medicos() {
  const { medicos } = useMedicosStore();
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState<JSX.Element[]>([]);
  const [search, setSearch] = React.useState("");
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: Medico }) => {
    return <MedicDataListItem medic={item} key={item.id} />;
  };

  React.useMemo(() => {
    const loadItems = async () => {
      const newItems = medicos.map((medico) => renderItem({ item: medico }));
      setItems(newItems);
    };

    loadItems().finally(() => setLoading(false));
  }, [medicos]);

  return (
    <Container
      paddingBottom={insets.bottom + 90}
      paddingTop={"$4"}
      paddingHorizontal={"$4"}
    >
      <Input
        placeholder="Buscar..."
        width={"100%"}
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <ScrollView width={"100%"} height={"100%"}>
        {loading ? (
          <Spinner />
        ) : search ? (
          items.filter((item) => {
            const nombre = item.props.medic.nombre.toLowerCase();
            const especialidad =
              item.props.medic.especialidad.especialidad.toLowerCase();
            const fecha = item.props.medic.create_at.split("T")[0].toLowerCase(); // suponiendo que la fecha es un string en formato YYYY-MM-DD

            const searchLower = search.toLowerCase();

            return (
              nombre.includes(searchLower) ||
              especialidad.includes(searchLower) ||
              fecha.includes(searchLower)
            );
          })
        ) : (
          items
        )}
      </ScrollView>

      <AddMedicFormModal />
    </Container>
  );
}
