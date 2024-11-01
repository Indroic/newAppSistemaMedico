import React from "react";
import { Button, Image, ScrollView, Text, XStack, YStack } from "tamagui";
import { Container } from "@/components/layouts";

import MedicDataListItem from "@/components/MedicDataListItem";
import { Medico } from "@/types";
import AddMedicFormModal from "@/components/AddMedicFormModal";
import { useMedicosStore } from "@/stores";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Spinner } from "tamagui";
import Input from "@/components/Input";
import { Search } from "@tamagui/lucide-icons";
import { setItem } from "expo-secure-store";

export default function Medicos() {
  const { medicos } = useMedicosStore();
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState<JSX.Element[]>([]);
  const [search, setSearch] = React.useState("");
  const [searchItems, setSearchItems] = React.useState<JSX.Element[]>([]);
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: Medico }) => {
    return <MedicDataListItem medic={item} key={item.id} />;
  };


  const searchItemsF = () => {
    setLoading(true);

    if (search === "") {
      setItems(medicos.map((medico) => renderItem({ item: medico })));
      setLoading(false);
      return
    }

    const result = items.filter((item) => {
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
    });

    setItems(result);
    setTimeout(() => setLoading(false), 3000);
    return 
  };

  React.useEffect(() => {
    const loadItems = async () => {
      const newItems = medicos.map((medico) => renderItem({ item: medico }));
      setItems(newItems);
    };

    loadItems().finally(() => setTimeout(() => setLoading(false), 3000));
  }, [medicos]);

  React.useEffect(() => {
    if (search === "") {
      setItems(medicos.map((medico) => renderItem({ item: medico })));
    }
  }, [search]);

  return (
    <Container
      paddingBottom={insets.bottom + 90}
      paddingTop={"$4"}
      paddingHorizontal={"$4"}
    >

      
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
      

      <AddMedicFormModal />
    </Container>
  );
}
