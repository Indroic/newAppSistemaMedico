import React from "react";
import { ScrollView, Spinner } from "tamagui";
import { Container } from "@/components/layouts";

import { Examen } from "@/types";
import { useExamenesStore } from "@/stores";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ExamDataListItem from "@/components/ExamDataListItem";
import AddExamFormModal from "@/components/addExamFormModal";

export default function Examenes() {
  const { examenes } = useExamenesStore();
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState<JSX.Element[]>([]);
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: Examen }) => {
    return <ExamDataListItem exam={item} key={item.id} />;
  };

  React.useMemo(() => {
    const loadItems = async () => {
      const newItems = examenes.map((medico) => renderItem({ item: medico }));
      setItems(newItems);
    };

    loadItems().then(() => setLoading(false));
  }, [examenes]);

  return (
    <Container paddingBottom={insets.bottom + 90} paddingTop={"$4"}>
      <ScrollView width={"100%"} height={"100%"} paddingHorizontal="$4">
        {loading ? <Spinner /> : items}
      </ScrollView>
      <AddExamFormModal />
    </Container>
  );
}
