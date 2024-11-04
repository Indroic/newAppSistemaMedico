import { Pencil } from "@tamagui/lucide-icons";
import React from "react";
import {
  Button,
  Sheet,
  XStack,
} from "tamagui";

import { Examen } from "@/types";


import XButton from "@/components/bases/XButton";


export default (props: { open: boolean, setOpen: (open: boolean) => void, children: React.ReactNode[] }) => {
  return (
    <XStack alignItems="center" gap={"$3"} position="absolute" left={0} zIndex={1000}>
      <Button
        size={"$3"}
        icon={<Pencil />}
        backgroundColor={"$colorTransparent"}
        onPress={() => props.setOpen(!props.open)}
      />
      <Sheet
        open={props.open}
        modal
        dismissOnSnapToBottom
        onOpenChange={props.setOpen}
        snapPoints={[60, 60]}
      >
        <Sheet.Frame
          borderWidth={1}
          borderColor="$borderColor"
          enterStyle={{ y: -10, opacity: 0 }}
          exitStyle={{ y: -10, opacity: 0 }}
          animation={[
            "fast",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          padding="$4"
          gap="$5"
        >
          <XButton onPress={() => props.setOpen(!props.open)} />
          <Sheet.ScrollView>
            {props.children}
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    </XStack>
  );
};
