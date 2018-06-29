import React from "react";
import styled from "styled-components/native";
import { SafeAreaView as SafeArea } from "react-native";

const SafeAreaView = styled(SafeArea)`
  ${p => p.theme.setupComponent(p)};
`;

export default props => (
  <SafeAreaView flex1 bgDark2>
    {props.children}
  </SafeAreaView>
);
