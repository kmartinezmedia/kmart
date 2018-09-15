import React from "react";
import styled from "styled-components/native";
import { SafeAreaView as SafeArea } from "react-navigation";
import { View } from "./View";

const SafeAreaView = styled(SafeArea)`
  ${p => p.theme.setupComponent(p)};
`;

export const Screen = ({ children, ...otherProps }) => (
  <SafeAreaView flex1 {...otherProps}>
    {children}
  </SafeAreaView>
);
