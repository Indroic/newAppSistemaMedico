import React from "react";
import { Sheet} from "tamagui";
import XButton from "./XButton";

export default (props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode[] | React.ReactNode;
  header?: React.ReactNode;
}) => {
  return (
    <Sheet
      open={props.open}
      modal
      dismissOnSnapToBottom
      onOpenChange={props.onOpenChange}
      snapPoints={[50, 60]}
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
      >
        <XButton onPress={() => props.onOpenChange(!props.open)} />
        {props.header}
        <Sheet.ScrollView gap={"$4"} padding="$3">
          {props.children}
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
};
