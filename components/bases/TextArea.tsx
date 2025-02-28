import React from "react";
import {
  createStyledContext,
  styled,
  withStaticProperties,
  TextArea as InputTamagui,
  Label as LabelTamagui,
  Button,
} from "tamagui";
import { CircleCheck, CircleX, Eye, EyeOff } from "@tamagui/lucide-icons";
import type { YStackProps } from "tamagui";
import { ContainerX, ContainerY } from "./layouts";

export interface InputProps extends YStackProps {
  isValid?: boolean;
  errorMessage?: string;
  errorMessages?: string[];
  label?: string;
  id?: string;
  placeholder?: string;
  isPassword?: boolean;
  onChangeText?: (value: string) => void;
  value?: string;
  disabled?: boolean;
}

export const InputContext = createStyledContext<InputProps>({
  isPassword: false,
});

const StyledInput = styled(InputTamagui, {
  name: "Input",
  context: InputContext,
  borderRadius: "$4",
  flex: 1,
  backgroundColor: "$background ",
  borderWidth: 1,
  borderColor: "$borderColor",
  paddingHorizontal: "$3",
  paddingVertical: "$2",

  focusStyle: {
    borderColor: "$accentColor",
    animateOnly: ["borderColor"],
  },

  variants: {
    isValid: {
      true: {
        borderColor: "green",
        color: "green",
        focusStyle: {
          borderColor: "green",
        },
      },
      false: {
        borderColor: "red",
        color: "red",
        focusStyle: {
          borderColor: "red",
        },
      },
    },
  },

  disabledStyle: {
    opacity: 0.5,
  },
});

const StyledLabel = styled(LabelTamagui, {
  name: "InputLabel",
  context: InputContext,
  fontSize: "$3",
  variants: {
    isValid: {
      true: {
        color: "green",
      },
      false: {
        color: "red",
      },
    },
  },
});

const InputContainer = styled(ContainerX, {
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
});

const Input = withStaticProperties(StyledInput, {
  errorMessages: undefined,
  errorMessage: undefined,
  label: undefined,
  id: undefined,
});

const Label = withStaticProperties(StyledLabel, {
  errorMessages: undefined,
  errorMessage: undefined,
  label: undefined,
  id: undefined,
});

export default (props: InputProps) => {
  const [isSecure, setIsSecure] = React.useState(props.isPassword);
  return (
    <ContainerY {...props}>
      {props.label && (
        <Label
          htmlFor={props.id}
          isValid={props.isValid}
          disabled={props.disabled}
          disabledStyle={{ opacity: 0.5 }}
        >
          {props.label}
        </Label>
      )}
      <InputContainer>
        <Input
          isValid={props.isValid}
          placeholder={props.placeholder}
          secureTextEntry={isSecure}
          onChangeText={(text) =>
            props.onChangeText ? props.onChangeText(text) : null
          }
          value={props.value}
          disabled={props.disabled}
        />
        {props.isPassword ? (
          <Button
            position="absolute"
            right="$-3"
            backgroundColor={"$colorTransparent"}
            onPress={() => setIsSecure(!isSecure)}
            pressStyle={{
              backgroundColor: "$colorTransparent",
              borderColor: "$colorTransparent",
            }}
            
            
          >
            {isSecure ? (
              <Eye
                color={
                  props.isValid != undefined
                    ? props.isValid
                      ? "green"
                      : "red"
                    : "$color9"
                }
                disabled={props.disabled}
                disabledStyle={{ opacity: 0.5 }}
              />
            ) : (
              <EyeOff
                color={
                  props.isValid != undefined
                    ? props.isValid
                      ? "green"
                      : "red"
                    : "$color9"
                }
                disabled={props.disabled}
                disabledStyle={{ opacity: 0.5 }}
              />
            )}
          </Button>
        ) : null}

        {props.isValid !== undefined ? (
          props.isValid ? (
            <CircleCheck
              position="absolute"
              top="$-4"
              right="$-3"
              color={"green"}
              disabled={props.disabled}
              disabledStyle={{ opacity: 0.5 }}
            />
          ) : (
            <CircleX
              position="absolute"
              top="$-4"
              right="$-3"
              disabled={props.disabled}
              disabledStyle={{ opacity: 0.5 }}
              color={"red"}
            />
          )
        ) : null}
      </InputContainer>
      {props.errorMessage ? (
        !props.isValid ? (
          <Label
            isValid={props.isValid}
            disabled={props.disabled}
            disabledStyle={{ opacity: 0.5 }}
            lineHeight={"$2"}
          >
            {props.errorMessage}
          </Label>
        ) : null
      ) : null}
    </ContainerY>
  );
};
