import React, { ReactElement } from "react";
import { Sheet } from "tamagui";
import XButton from "./XButton";

interface Props {
  children: ReactElement | ReactElement[];
  open: boolean;
  setOpen: (open: boolean) => void;
  snapPoints: number[];
}

export default function FormModal(props: Props) {
  return (
    <Sheet
      zIndex={2000}
      open={props.open}
      modal
      dismissOnSnapToBottom
      snapPoints={props.snapPoints}
      position={2}
      onOpenChange={props.setOpen}
      animation={"fast"}
    >
      <Sheet.Handle />
      <Sheet.Frame
        borderTopWidth={2}
        borderColor={"$color10"}
        padding="$4"
        justifyContent="center"
        alignItems="center"
      >
        <XButton onPress={() => props.setOpen(!props.open)} />
        <Sheet.ScrollView width={"100%"}>{props.children}</Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
}
