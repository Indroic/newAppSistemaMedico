import React, { ReactElement } from "react";
import { Sheet, Button } from "tamagui";
import { X, Plus } from "@tamagui/lucide-icons";
import { Container } from "@/components/layouts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import XButton from "./XButton";


interface Props {
  children: ReactElement | ReactElement[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function FormModal(props: Props) {
  const [open, setOpen] = React.useState(false);
  const insets = useSafeAreaInsets();

  return (
    <Container
      position="absolute"
      bottom={insets.bottom + 90}
      right={insets.right + 20}
      backgroundColor={"$backgroundTransparent"}
    >
      <Button
        elevation={"$1"}
        backgroundColor={"$accentBackground"}
        circular
        onPress={props.setOpen !== undefined ? () => props.setOpen(!props.open) : () => setOpen(!open)}
        icon={() => <Plus color={"white"} />}
      />
      <Sheet
        zIndex={20}
        open={props.open !== undefined ? props.open : open}
        modal
        dismissOnSnapToBottom
        snapPoints={[70, 70]}
        position={2}
        onOpenChange={props.setOpen !== undefined ? props.setOpen : setOpen}
        animation={"fast"}
      >
        <Sheet.Frame
          borderTopWidth={2}
          borderColor={"$color10"}
          padding="$4"
          justifyContent="center"
          alignItems="center"
        >
          <XButton onPress={props.setOpen !== undefined ? () => props.setOpen(!props.open) : () => setOpen(!open)} />
          <Sheet.ScrollView width={"100%"}>{props.children}</Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    </Container>
  );
}
