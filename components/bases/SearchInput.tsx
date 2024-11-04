import React from "react";
import { Button, XStack } from "tamagui";
import Input from "./Input";
import { Search } from "@tamagui/lucide-icons";

export const SearchInput = (props: { search: string; setSearch: (text: string) => void; searchItemsF: () => void }) => {
  return (
    <XStack justifyContent="space-between" maxWidth={"100%"}>
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
    </XStack>
  );
};
