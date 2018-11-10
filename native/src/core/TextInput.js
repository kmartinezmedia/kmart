import { TextInput as RNTextInput } from 'react-native';
import styled from 'styled-components/native';

export const TextInput = styled(RNTextInput).attrs({
  placeholderTextColor: p => p.theme.colors[p.placeholderColor],
  style: p => {
    return {
      fontFamily: p.theme.fonts.default,
      ...p.styled,
    };
  },
})`
  ${p => p.theme.setupComponent(p)};
`;
