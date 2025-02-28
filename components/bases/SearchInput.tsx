import React from "react";
import { Button} from "tamagui";
import Input from "./Input";
import { Search } from "@tamagui/lucide-icons";
import { ContainerX } from "./layouts";

export const SearchInput = (props: { search: string; setSearch: (text: string) => void; searchItemsF: () => void }) => {
  return (
    <ContainerX justifyContent="space-between" maxWidth={"100%"}>
      <Input
        placeholder="Buscar..."
        value={props.search}
        flex={1}
        onChangeText={(text) => props.setSearch(text)}
      />
      <Button
        icon={<Search />}
        onPress={() => {
          props.searchItemsF();
        }}
      />
    </ContainerX>
  );
};
