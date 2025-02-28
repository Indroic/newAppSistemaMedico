import React, { forwardRef } from 'react';
import { View, styled, XStack, YStack, TamaguiElement, Stack } from "tamagui";
import type { ViewProps, XStackProps, YStackProps } from 'tamagui';

const Container = styled(View, {
    flex: 1,
    backgroundColor: "$color1",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
});

const StackContainer = styled(Stack, {
    backgroundColor: "$color1",
})

const ContainerX = styled(XStack, {
    backgroundColor: "$color1",
});

const ContainerY = styled(YStack, {
    backgroundColor: "$color1",
});

const ForwardedContainer = forwardRef<TamaguiElement, ViewProps>((props, ref) => (
    <Container ref={ref} {...props} />
));

const ForwardedContainerX = forwardRef<TamaguiElement, XStackProps>((props, ref) => (
    <ContainerX ref={ref} {...props} />
));

const ForwardedContainerY = forwardRef<TamaguiElement, YStackProps>((props, ref) => (
    <ContainerY ref={ref} {...props} />
));

const ContainerStack = forwardRef<TamaguiElement, ViewProps>((props, ref) => (
    <StackContainer ref={ref} {...props} />
));

export { 
    ForwardedContainer as Container, 
    ForwardedContainerX as ContainerX, 
    ForwardedContainerY as ContainerY, 
    ContainerStack as StackContainer
};