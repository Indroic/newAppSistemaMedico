import React from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  CircleCheck,
  CircleX,
} from "@tamagui/lucide-icons";
import type {
  FontSizeTokens,
  SelectProps as tamaguiSelectProps,
} from "tamagui";
import {
  Adapt,
  Label as LabelTamagui,
  Select as SelectTamagui,
  Sheet,
  getFontSize,
  createStyledContext,
  styled
} from "tamagui";
import { ContainerY } from "./layouts";

interface ItemProps {
  value: string;
  text: string;
}

interface SelectProps extends tamaguiSelectProps {
  isValid?: boolean;
  label?: string;
  placeholder?: string;
  id?: string;
  items: ItemProps[];
  errorMessage?: string;
  disabled?: boolean;
}

export const SelectContext = createStyledContext<SelectProps>({
  items: [],
});

export const SelectTrigger = styled(SelectTamagui.Trigger, {
  name: "SelectTriger",
  context: SelectContext,

  variants: {
    isValid: {
      true: {
        borderColor: "green",
      },
      false: {
        borderColor: "red",
      },
    },
  },
  disabledStyle: {
    opacity: 0.5,
  },
});

export const SelectValue = styled(SelectTamagui.Value, {
  name: "SelectTriger",
  context: SelectContext,
  color: "$color9",
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
  disabledStyle: {
    opacity: 0.5,
  },
});

export const Label = styled(LabelTamagui, {
  name: "Label",
  context: SelectContext,

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

export default (props: SelectProps) => {
  return (
    <ContainerY>
      <Label isValid={props.isValid}>{props.label}</Label>
      <SelectTamagui
        value={props.value}
        onValueChange={props.onValueChange && props.onValueChange}
        disablePreventBodyScroll
        {...props}
      >
        {props.isValid !== undefined ? (
          props.isValid ? (
            <CircleCheck
              position="absolute"
              top="$5"
              right="$-3"
              color={"green"}
              disabled={props.disabled}
              disabledStyle={{ opacity: 0.5 }}
            />
          ) : (
            <CircleX
              position="absolute"
              top="$5"
              right="$-3"
              disabled={props.disabled}
              disabledStyle={{ opacity: 0.5 }}
              color={"red"}
              zIndex={1000}
            />
          )
        ) : null}
        <SelectTrigger
          disabled={props.disabled}
          isValid={props.isValid}
          iconAfter={
            <ChevronDown
              color={
                props.isValid !== undefined
                  ? props.isValid
                    ? "green"
                    : "red"
                  : "$color9"
              }
            />
          }
        >
          <SelectValue
            placeholder={props.placeholder}
            isValid={props.isValid}
          />
        </SelectTrigger>

        <Adapt platform="touch">
          <Sheet
            native={!!props.native}
            modal
            dismissOnSnapToBottom
            animationConfig={{
              type: "spring",
              damping: 20,
              mass: 1.2,
              stiffness: 250,
            }}
          >
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
          </Sheet>
        </Adapt>

        <SelectTamagui.Content zIndex={200000}>
          <SelectTamagui.ScrollUpButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <ContainerY zIndex={10}>
              <ChevronUp size={20} />
            </ContainerY>
          </SelectTamagui.ScrollUpButton>

          <SelectTamagui.Viewport>
            <SelectTamagui.Group>
              <SelectTamagui.Label>{props.label}</SelectTamagui.Label>
              {props.items &&
                React.useMemo(
                  () =>
                    props.items.map((item, i) => {
                      return (
                        <SelectTamagui.Item
                          index={i}
                          key={item.text}
                          value={item.value}
                        >
                          <SelectTamagui.ItemText>
                            {item.text}
                          </SelectTamagui.ItemText>
                          <SelectTamagui.ItemIndicator marginLeft="auto">
                            <Check size={16} />
                          </SelectTamagui.ItemIndicator>
                        </SelectTamagui.Item>
                      );
                    }),
                  [props.items]
                )}
            </SelectTamagui.Group>
            {/* Native gets an extra icon */}
            {props.native && (
              <ContainerY
                position="absolute"
                right={0}
                top={0}
                bottom={0}
                alignItems="center"
                justifyContent="center"
                width={"$4"}
                pointerEvents="none"
              >
                <ChevronDown
                  size={getFontSize((props.size as FontSizeTokens) ?? "$true")}
                  color={
                    props.isValid !== undefined
                      ? props.isValid
                        ? "green"
                        : "red"
                      : "$color9"
                  }
                />
              </ContainerY>
            )}
          </SelectTamagui.Viewport>

          <SelectTamagui.ScrollDownButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <ContainerY zIndex={10}>
              <ChevronDown size={20} />
            </ContainerY>
          </SelectTamagui.ScrollDownButton>
        </SelectTamagui.Content>
      </SelectTamagui>
      {props.errorMessage && props.isValid !== true ? (
        <Label lineHeight={"$2"} isValid={props.isValid}>
          {props.errorMessage}
        </Label>
      ) : null}
    </ContainerY>
  );
};
