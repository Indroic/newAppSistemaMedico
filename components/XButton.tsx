import { X } from "@tamagui/lucide-icons";
import React from "react";
import { Button } from "tamagui";
import type { ButtonProps } from "tamagui";




export default (props: ButtonProps) => {
  return (
    <Button
      position="absolute"
      top={0}
      right={0}
      size={"$3"}
      icon={<X />}
      zIndex={1000}
      backgroundColor={"$colorTransparent"}
      {...props}
    />
  );
}
