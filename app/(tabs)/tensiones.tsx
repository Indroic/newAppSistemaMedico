import React from "react";
import { Button, Image, ScrollView, XStack, YStack } from "tamagui";
import { Container } from "@/components/layouts";

import { Tension } from "@/types";
import { useMedicosStore } from "@/stores";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Input from "@/components/Input";
import { Search } from "@tamagui/lucide-icons";
import TensionDataListItem from "@/components/TensionDataListItem";
import AddTensionFormModal from "@/components/AddTensionFormModal";

export default function Tensiones() {
  const { tensiones } = useMedicosStore();
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState<JSX.Element[]>([]);
  const [search, setSearch] = React.useState("");
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: Tension }) => {
    return <TensionDataListItem tension={item} key={item.id} />;
  };

  const searchItemsF = () => {
    setLoading(true);

    if (search === "") {
      setItems(tensiones.map((tension) => renderItem({ item: tension })));
      setLoading(false);
      return;
    }
    const result = items.filter((item) => {
      const fecha = item.props.tension.create_at.split("T")[0].toLowerCase();  //suponiendo que la fecha es un string en formato YYYY-MM-DD
      return (
        fecha.includes(search.toLowerCase())
      );
    });

    setItems(result);
    setTimeout(() => setLoading(false), 3000);
    return;
  };

  React.useEffect(() => {
    const loadItems = async () => {
      const newItems = tensiones.map((tension) => renderItem({ item: tension }));
      setItems(newItems);
    };

    loadItems().then(() => setLoading(false));
  }, [tensiones]);

  React.useEffect(() => {
    if (search === "") {
      setItems(tensiones.map((tension) => renderItem({ item: tension })));
    }
  }, [search]);

  return (
    <Container
      paddingBottom={insets.bottom + 90}
      paddingTop={"$4"}
      paddingHorizontal="$4"
    >
      {loading ? (
        <Image source={require("../../assets/images/search.gif")} />
      ) : (
        <>
          <XStack justifyContent="space-between" maxWidth={"100%"}>
            <Input
              placeholder="Buscar(solo por fecha)..."
              value={search}
              flex={1}
              onChangeText={(text) => setSearch(text)}
            />
            <Button
              icon={<Search />}
              onPress={() => {
                searchItemsF();
              }}
            />
          </XStack>
          <ScrollView height={"100%"} width={"100%"}>
            {items.length > 0 ? (
              items.map((item) => item)
            ) : (
              <YStack
                alignItems="center"
                justifyContent="center"
                height={"100%"}
                width={"100%"}
              >
                <Image
                  scale={0.5}
                  width={"$24"}
                  height={"$24"}
                  borderColor={"$borderColor"}
                  borderWidth={1}
                  source={require("../../assets/images/not_found.png")}
                />
              </YStack>
            )
            }
          </ScrollView>
        </>
      )}

      <AddTensionFormModal />
    </Container>
  );
}
