import React from "react";
import styled from "styled-components/native";
import { SafeAreaView as SafeArea } from "react-native";
import { View } from "./View";

const SafeAreaView = styled(SafeArea)`
  ${p => p.theme.setupComponent(p)};
`;

export const Screen = props => (
  <SafeAreaView flex1>{props.children}</SafeAreaView>
);
