import React from "react";
import { XStack } from "tamagui";
import { Tension } from "@/types";
import TensionInfo from "./TensionInfo";

export default (props: { tension: Tension }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <XStack
      onPress={() => setOpen(!open)}
      alignItems="center"
      justifyContent="space-between"
      width={"100%"}
      gap={"$3"}
      paddingHorizontal="$4"
      paddingVertical="$2"
      borderWidth={1}
      borderColor="$borderColor"
      backgroundColor={"$background"}
      borderRadius={"$5"}
      marginVertical={"$2"}
    >
      <TensionInfo tension={props.tension} />
    </XStack>
  );
};
