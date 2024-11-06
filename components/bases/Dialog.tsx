import React from "react";
import { Menu, X } from "@tamagui/lucide-icons";
import {
  Button,
  Dialog,
} from "tamagui";
import XButton from "./XButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DialogInstance(props: {
  title: string;
  buttonText1: string;
  buttonText2: string;
  buttonAction1: () => void;
  buttonAction2: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const insets = useSafeAreaInsets();

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild position="absolute" bottom={insets.bottom + 100} right={20}>
        <Button
          elevation={"$1"}
          backgroundColor={"$accentBackground"}
          circular
          icon={() => <Menu color={"white"} />}
        />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={[
            "fast",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title key="title" size={"$7"}>
            {props.title}
          </Dialog.Title>
          <Button backgroundColor={"$color4"} borderColor={"$color8"} borderWidth={1}  onPress={() => { props.buttonAction1(); setOpen(!open); }} >{props.buttonText1}</Button>
          <Button backgroundColor={"$color4"} borderColor={"$color8"} borderWidth={1} onPress={() => { props.buttonAction2(); setOpen(!open); }} >{props.buttonText2}</Button>
          <Dialog.Close asChild>
            <XButton />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
