import React from "react";
import { XStack } from "tamagui";
import { Medico } from "@/types";
import { useMicelaneusStore } from "@/stores";
import DetailsMedicModal from "./DetailsMedicModal";
import MedicInfo from "./MedicInfo";

export default (props: { medic: Medico }) => {
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
      <MedicInfo medic={props.medic} avatarPlaceholder={"https://rnkqnkvcketqhptlupct.supabase.co/storage/v1/object/public/storage-medics/avatars/avatar-placeholder.png"} />
      <DetailsMedicModal
        medic={props.medic}
        open={open}
        onOpenChange={setOpen}
      />
    </XStack>
  );
};
