import React from "react";
import { ScrollView, Spinner } from "tamagui";
import { Container } from "@/components/layouts";

import { Examen } from "@/types";
import { useExamenesStore } from "@/stores";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ExamDataListItem from "@/components/ExamDataListItem";
import AddExamFormModal from "@/components/addExamFormModal";
import Input from "@/components/Input";

export default function Examenes() {
  const { examenes } = useExamenesStore();
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState<JSX.Element[]>([]);
  const [search, setSearch] = React.useState("");
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
    <Container paddingBottom={insets.bottom + 90} paddingTop={"$4"}  paddingHorizontal="$4">
      <Input
        placeholder="Buscar..."
        width={"100%"}
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <ScrollView width={"100%"} height={"100%"}>
        {loading ? <Spinner /> : search ? (
          items.filter((item) => {
            const titulo = item.props.exam.titulo.toLowerCase();
            const categoria =
              item.props.exam.categoria.categoria.toLowerCase();
            const fecha = item.props.exam.create_at.split("T")[0].toLowerCase(); // suponiendo que la fecha es un string en formato YYYY-MM-DD

            const searchLower = search.toLowerCase();

            return (
              titulo.includes(searchLower) ||
              categoria.includes(searchLower) ||
              fecha.includes(searchLower)
            );
          })
        ) : (
          items
        )}
      </ScrollView>
      <AddExamFormModal />
    </Container>
  );
}
