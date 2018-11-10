import React from 'react';
import { View } from './';

class ShadowCard extends React.Component {
  render() {
    const { children, ...otherProps } = this.props;
    return (
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
  }
}

export default ShadowCard;
