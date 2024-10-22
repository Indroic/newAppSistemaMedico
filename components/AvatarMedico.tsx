import { Medico } from "@/types";
import React from "react";
import { Avatar } from "tamagui";
import type { AvatarProps } from "tamagui";

interface Props extends AvatarProps {
  medic: Medico;
  avatarPlaceholder: string;
}

export default (props: Props) => {
  return (
    <Avatar circular {...props}>
      <Avatar.Image
        src={props.medic?.foto ? props.medic.foto : props.avatarPlaceholder}
      />
    </Avatar>
  );
};
