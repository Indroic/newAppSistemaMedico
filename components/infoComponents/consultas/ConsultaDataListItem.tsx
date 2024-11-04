import React from "react";
import { XStack } from "tamagui";
import { Consulta } from "@/types";
import ConsultaInfo from "./ConsultaInfo";
import DetailsConsultaModal from "./DetailsConsultaModal";

export default (props: { consulta: Consulta }) => {
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
      <ConsultaInfo consulta={props.consulta}/>
      <DetailsConsultaModal
        consulta={props.consulta}
        open={open}
        onOpenChange={setOpen}
      />
    </XStack>
  );
};
