import styled from "styled-components/native";
import { FlatList as RNFlatList } from "react-native";

export const FlatList = styled(RNFlatList)`
  ${p => p.theme.setupComponent(p)};
`;
