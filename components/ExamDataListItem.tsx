import React from "react";
import { XStack } from "tamagui";
import { Examen, Medico } from "@/types";
import { useMicelaneusStore } from "@/stores";
import DetailsMedicModal from "./DetailsMedicModal";
import MedicInfo from "./MedicInfo";
import DetailsExamModal from "./DetailsExamModal";
import ExamInfo from "./ExamInfo";

export default (props: { exam: Examen }) => {
  const [open, setOpen] = React.useState(false);

  const { avatarPlaceholder } = useMicelaneusStore();

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
      <ExamInfo exam={props.exam} avatarPlaceholder={avatarPlaceholder} />
      <DetailsExamModal
        exam={props.exam}
        open={open}
        onOpenChange={setOpen}
      />
    </XStack>
  );
};
