import React from "react";
import { ScrollView } from "tamagui";
import { Container } from "@/components/layouts";

import MedicDataListItem from "@/components/MedicDataListItem";
import { Medico } from "@/types";
import AddMedicFormModal from "@/components/AddMedicFormModal";
import { useMedicosStore } from "@/stores";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Spinner } from "tamagui";

export default function Medicos() {
  const { medicos } = useMedicosStore();
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState<JSX.Element[]>([]);
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: Medico }) => {
    return <MedicDataListItem medic={item} key={item.id} />;
  };

  React.useMemo(() => {
    const loadItems = async () => {
      const newItems = medicos.map((medico) => renderItem({ item: medico }));
      setItems(newItems);
    };

    loadItems().then(() => setLoading(false));
  }, [medicos]);

  return (
    <Container paddingBottom={insets.bottom + 90} paddingTop={"$4"}>
      <ScrollView width={"100%"} height={"100%"} paddingHorizontal="$4">
        {loading ? <Spinner /> : items}
      </ScrollView>

      <AddMedicFormModal />
    </Container>
  );
}
