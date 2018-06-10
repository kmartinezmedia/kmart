import React from "react";
import { View, Text } from "react-sketchapp";

const Label = ({ bold, children }) => (
  <Text
    style={{
      color: "#333",
      fontWeight: bold ? "bold" : "normal",
      fontSize: 16,
      lineHeight: 24
    }}
  >
    {children}
  </Text>
);

const TypeSpecimen = ({ name, style }) => {
  return (
    <View
      name={`TypeSpecimen-${name}`}
      style={{ flexDirection: "row", marginBottom: 24 }}
    >
      <View style={{ width: 100 }}>
        <Label>{`${style.fontSize} / ${style.lineHeight}`}</Label>
      </View>
      <Text
        style={{
          ...style
        }}
      >
        {name}
      </Text>
    </View>
  );
};

export default TypeSpecimen;
