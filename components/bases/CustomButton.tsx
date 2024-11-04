import React from "react";
import type { ButtonProps } from "tamagui";
import { Button, Text } from "tamagui";

interface Props extends ButtonProps {
  text: string;
}

export default (props: Props) => {
  return (
    <Button {...props} width={"100%"} backgroundColor={"$color4"} borderColor={"$color10"} disabledStyle={{ opacity: 0.5 }}>
      <Text color={"$white"}>{props.text}</Text>
    </Button>
  );
};
