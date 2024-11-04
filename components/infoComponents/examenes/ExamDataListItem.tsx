import React from "react";
import { XStack } from "tamagui";
import { Examen} from "@/types";
import DetailsExamModal from "./DetailsExamModal";
import ExamInfo from "./ExamInfo";

export default (props: { exam: Examen }) => {
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
      <ExamInfo exam={props.exam}/>
      <DetailsExamModal
        exam={props.exam}
        open={open}
        onOpenChange={setOpen}
      />
    </XStack>
  );
};
