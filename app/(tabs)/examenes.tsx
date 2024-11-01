import React from "react";
import { Button, Image, ScrollView, Spinner, XStack, YStack } from "tamagui";
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
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: Examen }) => {
    return <ExamDataListItem exam={item} key={item.id} />;
  };


  const searchItemsF = () => {
    setLoading(true);

    if (search === "") {
      setItems(examenes.map((examen) => renderItem({ item: examen })));
      setLoading(false);
      return
    }
    const result = items.filter((item) => {
      console.log(item)
      const titulo = item.props.exam.titulo.toLowerCase();
      const categoria =
        item.props.exam.categoria.categoria.toLowerCase();
      const fecha = item.props.exam.create_at.split("T")[0].toLowerCase(); // suponiendo que la fecha es un string en formato YYYY-MM-DD
      return titulo.includes(search.toLowerCase()) || categoria.includes(search.toLowerCase()) || fecha.includes(search.toLowerCase());
    });

    setItems(result);
    setTimeout(() => setLoading(false), 3000);
    return 
  };

  React.useMemo(() => {
    const loadItems = async () => {
      const newItems = examenes.map((medico) => renderItem({ item: medico }));
      setItems(newItems);
    };

    loadItems().then(() => setLoading(false));
  }, [examenes]);

  React.useEffect(() => {
    if (search === "") {
      setItems(examenes.map((examen) => renderItem({ item: examen })));
    }
  }, [search]);

  return (
    <Container paddingBottom={insets.bottom + 90} paddingTop={"$4"}  paddingHorizontal="$4">
      {loading ? 
        <Image source={require("../../assets/images/search.gif")} /> 
          : 
        
        <>      
          <XStack justifyContent="space-between" maxWidth={"100%"}>
            <Input
              placeholder="Buscar..."
              value={search}  
              flex={1}
              onChangeText={(text) => setSearch(text)}
            />
            <Button icon={<Search />} onPress={() => {searchItemsF();}}/>
          </XStack>
          <ScrollView height={"100%"} width={"100%"}>
            {items.length > 0 ? 
              items.map((item) => item) 
                : 
              <YStack alignItems="center" justifyContent="center" height={"100%"} width={"100%"}>
                <Image scale={0.5} width={"$24"} height={"$24"} borderColor={"$borderColor"} borderWidth={1} source={require("../../assets/images/not_found.png")} /> 
              </YStack>
            }
          </ScrollView>
        </>
      }
      

      <AddExamFormModal />
    </Container>
  );
}
