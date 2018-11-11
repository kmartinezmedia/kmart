import React from 'react';
import { View } from './View';

export const ShadowCard = ({ children, ...otherProps }) => (
  <View
    p24
    flex
    columns
    bgWhite
    br8
    shadowColor="black"
    shadowOpacity={0.08}
    shadowOffset={{ width: 5, height: 10 }}
    {...otherProps}
  >
    {children}
  </View>
);
