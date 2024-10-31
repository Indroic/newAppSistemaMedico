import React from "react";
import { Button, ScrollView, Spinner, XStack } from "tamagui";
import { Container } from "@/components/layouts";

import { Examen } from "@/types";
import { useExamenesStore } from "@/stores";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ExamDataListItem from "@/components/ExamDataListItem";
import AddExamFormModal from "@/components/addExamFormModal";
import Input from "@/components/Input";
import { Search } from "@tamagui/lucide-icons";

export default function Examenes() {
  const { examenes } = useExamenesStore();
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState<JSX.Element[]>([]);
  const [search, setSearch] = React.useState("");
  const [searchItems, setSearchItems] = React.useState<JSX.Element[]>([]);
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: Examen }) => {
    return <ExamDataListItem exam={item} key={item.id} />;
  };


  const searchItemsF = () => {
    const result = items.filter((item) => {
      const nombre = item.props.exam.nombre.toLowerCase();
      const especialidad =
        item.props.exam.especialidad.especialidad.toLowerCase();
      const fecha = item.props.exam.create_at.split("T")[0].toLowerCase(); // suponiendo que la fecha es un string en formato YYYY-MM-DD
      return nombre.includes(search.toLowerCase()) || especialidad.includes(search.toLowerCase()) || fecha.includes(search.toLowerCase());
    });

    setSearchItems(result);
    setLoading(false);
    return
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
     <XStack justifyContent="space-between" maxWidth={"100%"}>
      <Input
        placeholder="Buscar..."
        value={search}  
        flex={1}
        onChangeText={(text) => setSearch(text)}
      />
      <Button icon={<Search />} onPress={() => {setLoading(true); searchItemsF()}}/>
      </XStack>
      <ScrollView width={"100%"} height={"100%"}>
        {loading ? (
          <Spinner />
        ) : (
          searchItems && searchItems.length > 0 ? (
            searchItems
          ) : (
            items
        )
        )}
      </ScrollView>
      <AddExamFormModal />
    </Container>
  );
}
